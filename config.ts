export const baseAPI = 'http://192.168.1.24:5010';

export const app = {
  secretKey: 'hb2021',
  expiresIn: '1d',
};

export const rest = {
  login: () => '/api/v1/auth/login',
  getListChats: (page: number) => `/api/v1/users/chats?page=${page}&page_size=10`,
};
