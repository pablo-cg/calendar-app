export const initialState = {
  status: 'checking', // authenticated, not-authenticated
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated', // authenticated, not-authenticated
  user: { uid: '652962f857b07ef8119a1417', name: 'TEST USER' },
  // user: { uid: expect.any(String), name: 'TEST USER' },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated', // authenticated, not-authenticated
  user: {},
  errorMessage: undefined,
};
