import { rest } from '../../config';
import { callApi, rsa } from '../../utils';
import { ConversationInfoType, MessageType } from '../conversations/actions';

export const GET_GROUPS = 'GET_GROUPS';
export const GET_GROUP_MESSAGES = 'GET_GROUP_MESSAGES';
export const CREATE_GROUP_INFO = 'CREATE_GROUP_INFO';
export const CREATE_GROUP_CONTENT = 'CREATE_GROUP_CONTENT';
export const CREATE_GROUP_MESSAGE = 'CREATE_GROUP_MESSAGE';

export const getGroups = async (dispatch: any, payload: any) => {
  const { page } = payload;
  const response: any = await callApi({
    api: rest.getGroups(page),
    method: 'get',
  });
  const { status, data } = response;
  if (status) {
    dispatch({
      type: GET_GROUPS,
      payload: data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          avatar: item.avatar_path,
          online: item.online,
          latest_message: item.latest_message
            ? { ...item.latest_message, message: rsa.decrypt(item.latest_message.message) }
            : null,
        };
      }),
    });
    return data.length;
  }
  return -1;
};

export const getGroupMessages = async (dispatch: any, payload: any) => {
  const { conversationId, page } = payload;
  const response: any = await callApi({
    api: rest.getGroupMessages(conversationId, page),
    method: 'get',
  });
  const { status, data } = response;
  if (status) {
    dispatch({
      type: GET_GROUP_MESSAGES,
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

export const createGroupContent = (dispatch: any, payload: any) => {
  dispatch({
    type: CREATE_GROUP_CONTENT,
    payload: payload,
  });
};

export const createGroupMessage = async (
  dispatch: any,
  payload: { conversationsInfo: any; conversationId: string; message: MessageType; seen: boolean }
) => {
  const { conversationsInfo, conversationId, message, seen } = payload;
  const index = conversationsInfo.findIndex((item: ConversationInfoType) => item.id === conversationId);
  if (index === -1) {
    const response: any = await callApi({
      api: rest.getGroupInfo(conversationId),
      method: 'get',
    });
    const { status, data } = response;
    if (status) {
      dispatch({
        type: CREATE_GROUP_INFO,
        payload: {
          id: data.conversation_id,
          name: data.conversation_name,
          avatar: data.conversation_avatar,
          online: data.online,
          latest_message: null,
        },
      });
      dispatch({
        type: CREATE_GROUP_MESSAGE,
        payload: { conversationId, message: { ...message, message: rsa.decrypt(message.message) }, seen },
      });
      return true;
    }
    return false;
  }
  dispatch({
    type: CREATE_GROUP_MESSAGE,
    payload: { conversationId, message: { ...message, message: rsa.decrypt(message.message) }, seen },
  });
  return true;
};
