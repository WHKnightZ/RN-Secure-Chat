export const INIT_SOCKETIO = 'INIT_SOCKETIO';
export const CLOSE_SOCKETIO = 'CLOSE_SOCKETIO';

export const initSocketio = (payload: any) => {
  return { type: INIT_SOCKETIO, payload };
};

export const closeSocketio = () => {
  return { type: CLOSE_SOCKETIO };
};
