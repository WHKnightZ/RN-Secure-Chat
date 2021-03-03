export const baseAPI = 'http://sv3.vn.boot.ai:5010';

export const app = {
  secretKey: 'hb2021',
  expiresIn: '1d',
};

export const rest = {
  login: () => '/api/v1/auth/login',
  register: () => '/api/v1/users',
  getListChats: (page: number) => `/api/v1/users/chats?page=${page}&page_size=10`,
};