import { ADD_PUBLIC_KEY } from './actions';

const initialState = {};

export const publicKeysReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ADD_PUBLIC_KEY:
      const { userId, publicKey } = action.payload;
      let newState: any = { ...state };
      newState[userId] = publicKey;
      return newState;
    default:
      return state;
  }
};
