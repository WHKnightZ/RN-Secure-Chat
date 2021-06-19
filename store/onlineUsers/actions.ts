export const FETCH_ONLINE_USERS = 'FETCH_ONLINE_USERS';
export const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
export const REMOVE_ONLINE_USER = 'REMOVE_ONLINE_USER';

export const fetchOnlineUsers = (payload: string[]) => {
  return { type: FETCH_ONLINE_USERS, payload };
};

export const addOnlineUser = (payload: string) => {
  return { type: ADD_ONLINE_USER, payload };
};

export const removeOnlineUser = (payload: string) => {
  return { type: REMOVE_ONLINE_USER, payload };
};
