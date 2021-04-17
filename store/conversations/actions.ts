import { rest } from '../../config';
import { callApi, rsa } from '../../utils';
import { fetchConversationsUnseen } from '../common/actions';

export type ConversationInfoType = {
  id: string;
  name: string;
  avatar: string | null;
  online: boolean;
  latest_message: {
    created_date: number;
    id: string;
    sender_id: string;
    message: string;
    seen: boolean;
  };
};

export type MessageType = {
  created_date: number;
  id: string;
  message: string;
  sender_id: string;
  avatar: string | null;
  seen: boolean;
};

export type ConversationContentType = {
  id: string;
  name: string;
  avatar: string | null;
  online: boolean;
  messages: MessageType[];
  full: boolean;
  publicKeys: any;
};

export const RELOAD_MESSENGER = 'RELOAD_MESSENGER';
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const GET_MESSAGES = 'GET_MESSAGES';
export const CREATE_CONVERSATION_INFO = 'CREATE_CONVERSATION_INFO';
export const CREATE_CONVERSATION_CONTENT = 'CREATE_CONVERSATION_CONTENT';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';

export const reloadMessenger = () => {
  return { type: RELOAD_MESSENGER };
};

export const getConversations = async (dispatch: any, payload: any) => {
  const { page } = payload;
  const response: any = await callApi({
    api: rest.getConversations(page),
    method: 'get',
  });
  const { status, data } = response;
  if (status) {
    let unseen: any[] = [];
    dispatch({
      type: GET_CONVERSATIONS,
      payload: data.map((item: any) => {
        if (item.unseen) unseen.push(item.id);
        return {
          id: item.id,
          name: item.display_name || item.username,
          avatar: item.avatar_path,
          online: item.online,
          latest_message: item.latest_message
            ? { ...item.latest_message, message: rsa.decrypt(item.latest_message.message) }
            : null,
        };
      }),
    });
    dispatch(fetchConversationsUnseen({ unseenPrivate: unseen }));
    return data.length;
  }
  return -1;
};

export const getMessages = async (dispatch: any, payload: any) => {
  const { conversationId, page } = payload;
  const response: any = await callApi({
    api: rest.getMessages(conversationId, page),
    method: 'get',
  });
  const { status, data } = response;
  if (status) {
    dispatch({
      type: GET_MESSAGES,
      payload: {
        conversationId,
        messages: data.map((item: MessageType) => {
          return { ...item, message: rsa.decrypt(item.message) };
        }),
      },
    });
    return data.length;
  }
  return -1;
};

export const createConversationContent = (dispatch: any, payload: any) => {
  dispatch({
    type: CREATE_CONVERSATION_CONTENT,
    payload: payload,
  });
};

export const createMessage = async (
  dispatch: any,
  payload: { conversationsInfo: any; conversationId: string; message: MessageType; seen: boolean }
) => {
  const { conversationsInfo, conversationId, message, seen } = payload;
  const index = conversationsInfo.findIndex((item: ConversationInfoType) => item.id === conversationId);
  if (index === -1) {
    const response: any = await callApi({
      api: rest.getUserById(conversationId),
      method: 'get',
    });
    const { status, data } = response;
    if (status) {
      dispatch({
        type: CREATE_CONVERSATION_INFO,
        payload: {
          id: data.id,
          name: data.display_name || data.username,
          avatar: data.avatar_path,
          online: data.online,
          latest_message: null,
        },
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: { conversationId, message: { ...message, message: rsa.decrypt(message.message) }, seen },
      });
      return true;
    }
    return false;
  }
  dispatch({
    type: CREATE_MESSAGE,
    payload: { conversationId, message: { ...message, message: rsa.decrypt(message.message) }, seen },
  });
  return true;
};
