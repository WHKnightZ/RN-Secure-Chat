import { includes } from '../../utils';
import { GET_FRIENDS, ADD_FRIEND, FriendType } from './actions';

export const friendsReducer = (state = [], action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIENDS:
      const filteredFriends = payload.filter((friend: FriendType) => !includes(state, friend));
      return [...filteredFriends, ...state];

    case ADD_FRIEND:
      console.log(state, payload)
      if (!includes(state, payload)) return [payload, ...state];
      return state;

    default:
      return state;
  }
};
