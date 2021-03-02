import axios from 'axios';
import { rest } from '../../config';
import { callApi } from '../../utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const loginAction = (payload: any) => {
  return async (dispatch: any) => {
    const response: any = await callApi({
      api: rest.login(),
      method: 'get',
      body: payload,
    });
    const { status, data } = response;
    if (status) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
      dispatch({ type: LOGIN, payload });
    }
  };
};

export const registerAction = (payload: any) => {
  return async (dispatch: any) => {
    const response: any = await callApi({
      api: rest.login(),
      method: 'get',
      body: payload,
    });
    const { status, data } = response;
    if (status) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
      dispatch({ type: LOGIN, payload });
    }
  };
};
