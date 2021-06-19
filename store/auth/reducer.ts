import { LOGIN, LOGOUT, UPDATE_AUTH } from './actions';

const initialState = {};

export const authReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return { ...payload };

    case LOGOUT:
      return {};
      
    case UPDATE_AUTH:
      return { ...state, ...payload };

    default:
      return state;
  }
};
