import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/auth-slice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/auth-states';
import { testUserCredentials } from '../../fixtures/test-user';

describe('auth-slice Tests', () => {
  test('debe regresar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('debe realizar el login', () => {
    const state = authSlice.reducer(
      initialState,
      onLogin(testUserCredentials.user)
    );

    expect(state).toEqual(authenticatedState);
  });

  test('debe realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual(notAuthenticatedState);
  });

  test('debe realizar el logout con un mensaje de error', () => {
    const errorMessage = 'test error';

    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('debe limpiar el mensaje de error', () => {
    const errorMessage = 'test error';

    let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    state = authSlice.reducer(state, clearErrorMessage());

    expect(state.errorMessage).toBe(undefined);
  });
});
