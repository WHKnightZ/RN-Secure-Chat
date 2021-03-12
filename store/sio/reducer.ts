import { INIT_SOCKETIO, CLOSE_SOCKETIO } from './actions';

const initialState = null;

export const socketioReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case INIT_SOCKETIO:
      return action.payload;
    case CLOSE_SOCKETIO:
      return {};

    default:
      return state;
  }
};
