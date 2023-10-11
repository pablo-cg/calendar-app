import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store/auth/auth-slice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function startLogin(payload) {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth', payload);

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  }

  async function startRegister(payload) {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth/register', payload);

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch ({ response }) {
      const emailError = response.data?.errors?.email
        ? 'El correo no corresponde'
        : undefined;

      const passwordError = response.data?.errors?.password?.msg?.replace(
        'password',
        'La Contraseña'
      );

      const otherError = response.data?.msg;

      dispatch(onLogout(emailError || passwordError || otherError));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  }

  async function checkToken() {
    const currentToken = localStorage.getItem('token');

    if (!currentToken) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/token');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      localStorage.clear();
      console.log(error);
      dispatch(onLogout());
    }
  }

  function startLogout() {
    localStorage.clear();
    dispatch(onLogout());
  }

  return {
    errorMessage,
    status,
    user,
    checkToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
