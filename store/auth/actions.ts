export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (payload: any) => {
  return { type: LOGIN, payload };
};

export const logoutAction = (payload: any) => {
  return { type: LOGOUT, payload };
};

