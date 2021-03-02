import { LOGIN, LOGOUT } from './actions';

const initialState = {};

export const authReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload };
    case LOGOUT:
      return {};

    default:
      return state;
  }
};
