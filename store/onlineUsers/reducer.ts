import { ADD_ONLINE_USER, FETCH_ONLINE_USERS, REMOVE_ONLINE_USER } from './actions';

const initialState: string[] = [];

export const onlineUsersReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case FETCH_ONLINE_USERS:
      return action.payload;

    case ADD_ONLINE_USER:
      const existedId = state.find((item) => item === action.payload);
      if (!existedId && action.payload) {
        return [...state, action.payload];
      }
      return state;

    case REMOVE_ONLINE_USER:
      const newState = state.filter((item) => item !== action.payload);
      return newState;

    default:
      return state;
  }
};
