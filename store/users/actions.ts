export const ADD_USER = 'ADD_USER';

export const addUser = (payload: { userId: string; avatar: string; publicKey: any }) => {
  return { type: ADD_USER, payload };
};
