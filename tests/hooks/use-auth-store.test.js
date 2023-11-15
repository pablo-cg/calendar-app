import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/use-auth-store';
import { authSlice } from '../../src/store';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../fixtures/auth-states';
import { testUserCredentials } from '../fixtures/test-user';

function getMockStore(state) {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: { auth: { ...state } },
  });
}

describe('use-auth-store Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('debe regresar los valores por defecto', () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      checkToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test('startLogin debe realizar el login correctamente', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    // expect({ errorMessage, status, user }).toEqual({
    //   errorMessage: undefined,
    //   status: 'authenticated',
    //   user: testUserCredentials.user,
    // });
    expect({ errorMessage, status, user }).toEqual({
      ...authenticatedState,
      user: {
        ...authenticatedState.user,
        uid: expect.any(String),
      },
    });
    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-date')).toEqual(expect.any(String));
  });

  test('startLogin debe fallar la autenticacion', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: 'email@no.existe',
        password: 'noexiste',
      });
    });

    const { errorMessage, status, user } = result.current;

    // expect({ errorMessage, status, user }).toEqual({
    //   errorMessage: 'Credenciales incorrectas',
    //   status: 'not-authenticated',
    //   user: {},
    // });
    expect({ errorMessage, status, user }).toEqual({
      ...notAuthenticatedState,
      // errorMessage: 'Credenciales incorrectas',
      errorMessage: expect.any(String),
    });
    expect(localStorage.getItem('token')).toBe(null);

    await waitFor(() => expect(result.current.errorMessage).toBeUndefined());
  });

  test('startRegister debe crear un usuario', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const newUser = {
      email: 'registro@nuevo.usuario',
      password: 'registro',
      name: 'Test',
    };

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        token: 'token',
        user: {
          uid: 'id-usuario',
          name: 'Test',
        },
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      errorMessage: undefined,
      user: {
        uid: 'id-usuario',
        name: 'Test',
      },
    });

    spy.mockRestore(); // IMPORTANTE: borra el mock del calendarApi.post()
  });

  test('startRegister debe fallar al crear un usuario ya registrado', async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister({
        ...testUserCredentials,
        name: 'TEST-USER',
      });
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      ...notAuthenticatedState,
      // errorMessage: 'Ya existe un usuario con ese email',
      errorMessage: expect.any(String),
    });
  });

  test('checkToken debe fallar si no hay token', async () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual(notAuthenticatedState);
  });

  test('checkToken debe autenticar al usuario si hay token', async () => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);

    localStorage.setItem('token', data.token);

    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      ...authenticatedState,
      user: {
        ...authenticatedState.user,
        uid: expect.any(String),
      },
    });
  });
});
