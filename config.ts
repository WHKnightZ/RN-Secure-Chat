export const BASE_URL = 'http://sv3.vn.boot.ai:5010';
// export const BASE_URL = 'http://192.168.1.5:5012';

export const app = {
  secretKey: 'secure-chat',
  expiresIn: '1d',
  timeout: 2000,
};

export const rest = {
  login: () => '/api/v1/auth/login',
  register: () => '/api/v1/users',
  logout: () => '/api/v1/auth/logout',
  getUserById: (userId: string) => `/api/v1/users/${userId}`,
  addContact: (userId: string) => `/api/v1/users/friends/${userId}`,
  createMessage: (conversationId: string) => `/api/v1/chats/${conversationId}`,
  getConversations: (page: number) => `/api/v1/users/chats?page=${page}&page_size=10`,
  getConversationInfo: (id: string) => `/api/v1/chats/${id}/info`,
  getMessages: (conversationId: string, page: number) => `/api/v1/chats/${conversationId}?page=${page}&page_size=20`,
  searchFriends: (keyword: string) => `/api/v1/users/search?text_search=${keyword}`,
};

export type UserType = {
  id: string;
  username: string;
  avatar_path: string;
  created_date: number;
  display_name: string | null;
  force_change_password: boolean;
  gender: boolean;
  online: boolean;
  pub_key: string;
};
