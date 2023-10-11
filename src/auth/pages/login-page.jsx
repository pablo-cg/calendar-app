import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './login-page.css';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  name: '',
  email: '',
  password: '',
  passwordCheck: '',
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        title: 'Error en la autenticación',
        text: errorMessage,
        icon: 'error',
      });
    }
  }, [errorMessage]);

  const { formState: loginState, onInputChange: onLoginInputChange } =
    useForm(loginFormFields);

  const { formState: registerState, onInputChange: onRegisterInputChange } =
    useForm(registerFormFields);

  function handleLoginSubmit(event) {
    event.preventDefault();
    startLogin({
      email: loginState.loginEmail,
      password: loginState.loginPassword,
    });
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    if (registerState.password !== registerState.passwordCheck) {
      Swal.fire({
        title: 'Error en registro',
        text: 'Las contraseñas no coinciden',
        icon: 'warning',
      });

      return;
    }

    startRegister({
      name: registerState.name,
      email: registerState.email,
      password: registerState.password,
    });
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginState.loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginState.loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="mt-4">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={registerState.name}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={registerState.email}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={registerState.password}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="passwordCheck"
                value={registerState.passwordCheck}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="mt-4">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
