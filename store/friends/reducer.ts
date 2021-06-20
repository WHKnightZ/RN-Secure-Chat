import { GET_FRIENDS, ADD_FRIEND, FriendType } from './actions';

const updateFriends = (friends: FriendType[], newFriend: FriendType) => {
  const index = friends.findIndex((item) => item.id === newFriend.id);
  if (index === -1) {
    friends.unshift(newFriend);
    return;
  }
  friends[index] = newFriend;
};

export const friendsReducer = (state = [], action: { type: string; payload: any }) => {
  const { type, payload } = action;
  let newFriends: FriendType[];

  switch (type) {
    case GET_FRIENDS:
      newFriends = [...state];
      payload.forEach((item: FriendType) => updateFriends(newFriends, item));
      return newFriends;

    case ADD_FRIEND:
      newFriends = [...state];
      updateFriends([...state], payload);
      return newFriends;

    default:
      return state;
  }
};
