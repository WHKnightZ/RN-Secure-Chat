// export const BASE_URL = 'http://sv3.vn.boot.ai:5010';
export const BASE_URL = 'http://192.168.0.101:5010';

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
  getConversations: (page: number) => `/api/v1/chats?page=${page}&page_size=10`,
  getConversationInfo: (id: string) => `/api/v1/chats/${id}/info`,
  createMessage: (conversationId: string) => `/api/v1/chats/${conversationId}`,
  getMessages: (conversationId: string, page: number) => `/api/v1/chats/${conversationId}?page=${page}&page_size=80`,
  searchFriends: (keyword: string) => `/api/v1/users/search?text_search=${keyword}`,
  createGroup: () => '/api/v1/groups',
  getGroups: (page: number) => `/api/v1/group_chats?page=${page}&page_size=10`,
  getGroupInfo: (id: string) => `/api/v1/group_chats/${id}/info`,
  createGroupMessage: (groupId: string) => `/api/v1/group_chats/${groupId}`,
  getGroupMessages: (groupId: string, page: number) => `/api/v1/group_chats/${groupId}?page=${page}&page_size=80`,
  getUnseenConversations: () => '/api/v1/users/unseen_conversations',
  updateProfile: () => '/api/v1/users/profile',
  changeAvatar: () => '/api/v1/users/avatar',
  changePassword: () => '/api/v1/users/change_password',
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

export const SL_NONE = 1;
export const SL_LOW = 2;
export const SL_MEDIUM = 3;
export const SL_HIGH = 4;

/**
 * Get time in seconds from security level
 * HIGH-4: 1 second
 * MEDIUM-3: 1 day
 * LOW-2: 1 week
 * NONE-1: Never update
 */
export const mappingSLTime: any = {
  4: 1,
  3: 86400,
  2: 604800,
  1: 0,
};

export const slChoices = [
  {
    label: 'Cao (Cập nhật khóa mỗi lần vào app)',
    value: SL_HIGH,
  },
  {
    label: 'Vừa (Cập nhật khóa mỗi ngày)',
    value: SL_MEDIUM,
  },
  {
    label: 'Thấp (Cập nhật khóa mỗi tuần)',
    value: SL_LOW,
  },
  {
    label: 'Kém (Không cập nhật khóa)',
    value: SL_NONE,
  },
];
