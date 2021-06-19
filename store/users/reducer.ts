import { ADD_USER } from './actions';

const initialState = {};

export const usersReducer = (
  state = initialState,
  action: { type: string; payload: { userId: string; avatar: string; publicKey: any } }
) => {
  switch (action.type) {
    case ADD_USER:
      const { userId, avatar, publicKey } = action.payload;
      let newState: any = { ...state };
      newState[userId] = { avatar, publicKey };
      return newState;
      
    default:
      return state;
  }
};
