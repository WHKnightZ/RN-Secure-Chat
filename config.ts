// export const baseAPI = 'http://sv3.vn.boot.ai:5010';
export const baseAPI = 'http://192.168.1.24:5012';
export const socketioURL = 'http://192.168.1.24:5012';

export const app = {
  secretKey: 'secure-chat',
  expiresIn: '1d',
  timeout: 2000,
};

export const rest = {
  login: () => '/api/v1/auth/login',
  register: () => '/api/v1/users',
  logout: () => '/api/v1/auth/logout',
  getListChats: (page: number) => `/api/v1/users/chats?page=${page}&page_size=10`,
};
