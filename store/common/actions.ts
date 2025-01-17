export const SAVE_NAVIGATION = 'SAVE_NAVIGATION';
export const SHOW_SCAN_QR = 'SHOW_SCAN_QR';
export const HIDE_SCAN_QR = 'HIDE_SCAN_QR';
export const FETCH_CONVERSATIONS_UNSEEN = 'FETCH_CONVERSATIONS_UNSEEN';
export const SEEN_CONVERSATION = 'SEEN_CONVERSATION';
export const FOCUS_SCREEN = 'FOCUS_SCREEN';
export const UNFOCUS_SCREEN = 'UNFOCUS_SCREEN';
export const LOAD_CONVERSATION = 'LOAD_CONVERSATION';
export const CHANGE_SECURITY_LEVEL = 'CHANGE_SECURITY_LEVEL';

export const saveNavigation = (payload: any) => {
  return { type: SAVE_NAVIGATION, payload };
};

export const showScanQR = (callback: any) => {
  return { type: SHOW_SCAN_QR, payload: callback };
};

export const hideScanQR = () => {
  return { type: HIDE_SCAN_QR };
};

export const fetchConversationsUnseen = (payload: { unseenPrivate?: string[]; unseenGroup?: string[] }) => {
  return { type: FETCH_CONVERSATIONS_UNSEEN, payload };
};

export const seenConversation = (payload: { seenPrivate?: string; seenGroup?: string }) => {
  return { type: SEEN_CONVERSATION, payload };
};

export const focusScreen = (screenId: string) => {
  return { type: FOCUS_SCREEN, payload: screenId };
};

export const unFocusScreen = (screenId: string) => {
  return { type: UNFOCUS_SCREEN, payload: screenId };
};

export const loadConversation = (conversationId: string) => ({ type: LOAD_CONVERSATION, payload: conversationId });

export const changeSecurityLevel = (securityLevel: number) => ({ type: CHANGE_SECURITY_LEVEL, payload: securityLevel });
