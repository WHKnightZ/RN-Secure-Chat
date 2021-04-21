export const SAVE_NAVIGATION = 'SAVE_NAVIGATION';
export const SHOW_SCAN_QR = 'SHOW_SCAN_QR';
export const HIDE_SCAN_QR = 'HIDE_SCAN_QR';
export const FETCH_CONVERSATIONS_UNSEEN = 'FETCH_CONVERSATIONS_UNSEEN';
export const SEEN_CONVERSATION = 'SEEN_CONVERSATION';
export const CHANGE_FOCUS = 'CHANGE_FOCUS';

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

export const changeFocus = (payload: string | null) => {
  return { type: CHANGE_FOCUS, payload };
};
