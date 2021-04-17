// export const BASE_URL = 'http://sv3.vn.boot.ai:5010';
export const BASE_URL = 'http://13.212.239.89:5010';

export const app = {
  secretKey: 'secure-chat',
  timeout: 2000,
};

export const rest = {
  login: () => '/api/v1/auth/login',
  register: () => '/api/v1/users',
  logout: () => '/api/v1/auth/logout',
  getUserById: (userId: string) => `/api/v1/users/${userId}`,
  addContact: (userId: string) => `/api/v1/users/friends/${userId}`,
  createMessage: (conversationId: string) => `/api/v1/chats/${conversationId}`,
  getConversationInfo: (id: string) => `/api/v1/chats/${id}/info`,
  getConversations: (page: number) => `/api/v1/chats?page=${page}&page_size=10`,
  getMessages: (conversationId: string, page: number) => `/api/v1/chats/${conversationId}?page=${page}&page_size=20`,
  getPublicKeys: (conversationId: string) => `/api/v1/chats/${conversationId}/public_keys`,
  searchFriends: (keyword: string) => `/api/v1/users/search?text_search=${keyword}`,
  createGroup: () => '/api/v1/groups',
  getGroups: (page: number) => `/api/v1/group_chats?page=${page}&page_size=10`,
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
