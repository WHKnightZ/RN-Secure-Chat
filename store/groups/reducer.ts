import { includes } from '../../utils';
import { ConversationContentType, ConversationInfoType, MessageType, RELOAD_MESSENGER } from '../conversations/actions';
import {
  CREATE_GROUP_CONTENT,
  CREATE_GROUP_INFO,
  CREATE_GROUP_MESSAGE,
  GET_GROUPS,
  GET_GROUP_MESSAGES,
} from './actions';

export const groupsInfoReducer = (state = [], action: { type: string; payload: any }) => {
  const { type, payload } = action;
  let conversations: ConversationInfoType[];

  switch (type) {
    case GET_GROUPS:
      return [...state, ...payload.filter((item: any) => !includes(state, item))];
    case CREATE_GROUP_INFO:
      if (!includes(state, payload)) return [payload, ...state];
      return state;

    case CREATE_GROUP_MESSAGE:
      const { conversationId, message } = payload;
      conversations = [...state];
      const index = conversations.findIndex((item: ConversationInfoType) => item.id === conversationId);
      conversations[index].latest_message = message;
      const item = conversations[index];
      conversations.splice(index, 1);
      conversations = [item, ...conversations];
      return conversations;
    case RELOAD_MESSENGER:
      return [];

    default:
      return state;
  }
};

export const groupsContentReducer = (state = [], action: { type: string; payload: any }) => {
  const { payload } = action;
  let conversationId: string, messages: MessageType[], message: MessageType;
  let conversations: ConversationContentType[], index: number;
  switch (action.type) {
    case GET_GROUP_MESSAGES:
      conversationId = payload.conversationId;
      messages = payload.messages;
      conversations = [...state];
      index = conversations.findIndex((item: ConversationContentType) => item.id === conversationId);
      const newMessages = conversations[index].messages;
      const filteredMessages = messages.filter((message) => !includes(newMessages, message));
      conversations[index].messages = [...conversations[index].messages, ...filteredMessages];
      conversations[index].full = messages.length < 20;
      return conversations;
    case CREATE_GROUP_CONTENT:
      return [...state, action.payload];
    case CREATE_GROUP_MESSAGE:
      conversationId = payload.conversationId;
      message = payload.message;
      conversations = [...state];
      index = conversations.findIndex((item: ConversationContentType) => item.id === conversationId);
      if (index !== -1) {
        if (!includes(conversations[index].messages, message))
          conversations[index].messages = [message, ...conversations[index].messages];
        return conversations;
      }
      return state;

    case RELOAD_MESSENGER:
      return [];

    default:
      return state;
  }
};
