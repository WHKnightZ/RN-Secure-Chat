export const BASE_URL = 'http://sv2.vn.boot.ai:5010';

export const DEFAULT_AVATAR = `${BASE_URL}/avatars/default_avatar.png`;

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
  getOnlineUsers: () => '/api/v1/users/online_users',
  updateProfile: () => '/api/v1/users/profile',
  changeAvatar: () => '/api/v1/users/avatar',
  changePassword: () => '/api/v1/users/change_password',
  getFriends: () => '/api/v1/users/friends',
  addFriends: (userId: string) => `/api/v1/users/friends/${userId}`,
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

export const SECURITY_LEVELS = {
  NONE: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
};

/**
 * Get time in seconds from security level
 * HIGH: 1 second
 * MEDIUM: 1 day
 * LOW: 1 week
 * NONE: Never update
 */
export const mappingSLTime: any = {
  [SECURITY_LEVELS.HIGH]: 1,
  [SECURITY_LEVELS.MEDIUM]: 86400,
  [SECURITY_LEVELS.LOW]: 604800,
  [SECURITY_LEVELS.NONE]: 0,
};

export const slChoices = [
  {
    label: 'Cao (Cập nhật khóa mỗi lần vào app)',
    value: SECURITY_LEVELS.HIGH,
  },
  {
    label: 'Vừa (Cập nhật khóa mỗi ngày)',
    value: SECURITY_LEVELS.MEDIUM,
  },
  {
    label: 'Thấp (Cập nhật khóa mỗi tuần)',
    value: SECURITY_LEVELS.LOW,
  },
  {
    label: 'Kém (Không cập nhật khóa)',
    value: SECURITY_LEVELS.NONE,
  },
];
