import { includes } from '../../utils';
import {
  RELOAD_MESSENGER,
  GET_CONVERSATIONS,
  GET_MESSAGES,
  CREATE_CONVERSATION_INFO,
  CREATE_CONVERSATION_CONTENT,
  CREATE_MESSAGE,
  ConversationInfoType,
  ConversationContentType,
  MessageType,
} from './actions';

/**
 * Update list conversations, if new item is in list, update this item, otherwise, add item to list
 * @param convsInfo
 * @param newConvInfo
 */
const updateConvsInfo = (convsInfo: ConversationInfoType[], newConvInfo: ConversationInfoType) => {
  const index = convsInfo.findIndex((item) => item.id === newConvInfo.id);
  if (index === -1) {
    convsInfo.unshift(newConvInfo);
    return;
  }
  convsInfo[index].latest_message = newConvInfo.latest_message || convsInfo[index].latest_message;
};

export const conversationsInfoReducer = (state = [], action: { type: string; payload: any }) => {
  const { type, payload } = action;
  let conversations: ConversationInfoType[];

  switch (type) {
    case GET_CONVERSATIONS:
      conversations = [...state];
      payload.forEach((item: ConversationInfoType) => updateConvsInfo(conversations, item));
      return conversations;

    case CREATE_CONVERSATION_INFO:
      conversations = [...state];
      updateConvsInfo(conversations, payload);
      return conversations;

    case CREATE_MESSAGE:
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

export const conversationsContentReducer = (state = [], action: { type: string; payload: any }) => {
  const { payload } = action;
  let conversationId: string, messages: MessageType[], message: MessageType;
  let conversations: ConversationContentType[], index: number;

  switch (action.type) {
    case GET_MESSAGES:
      conversationId = payload.conversationId;
      messages = payload.messages;
      conversations = [...state];
      index = conversations.findIndex((item: ConversationContentType) => item.id === conversationId);
      const newMessages = conversations[index].messages;
      const filteredMessages = messages.filter((message) => !includes(newMessages, message));
      conversations[index].messages = [...filteredMessages, ...conversations[index].messages];
      conversations[index].full = messages.length < 80;
      return conversations;

    case CREATE_CONVERSATION_CONTENT:
      let newState: ConversationContentType[] = [...state];
      index = newState.findIndex((item: ConversationContentType) => item.id === payload.id);
      if (index !== -1) {
        const msgs = newState[index].messages;
        newState[index] = payload;
        newState[index].messages = msgs;
        return newState;
      }
      return [...newState, payload];

    case CREATE_MESSAGE:
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
