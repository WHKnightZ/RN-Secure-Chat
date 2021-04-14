export const ADD_PUBLIC_KEY = 'ADD_PUBLIC_KEY';

export const addPublicKey = (payload: { userId: string; publicKey: any }) => {
  return { type: ADD_PUBLIC_KEY, payload };
};
