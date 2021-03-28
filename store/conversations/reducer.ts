import { includes } from '../../utils';
import {
  RELOAD_MESSENGER,
  GET_CONVERSATIONS,
  GET_MESSAGES,
  CREATE_CONVERSATION_INFO,
  CREATE_CONVERSATION_CONTENT,
  CREATE_MESSAGE,
  SEEN_CONVERSATION,
  ConversationInfoType,
  ConversationContentType,
  MessageType,
} from './actions';

export const conversationsInfoReducer = (state = [], action: { type: string; payload: any }) => {
  let conversations: ConversationInfoType[];

  switch (action.type) {
    case GET_CONVERSATIONS:
      return [...state, ...action.payload];
    case CREATE_CONVERSATION_INFO:
      return [action.payload, ...state];
    case CREATE_MESSAGE:
      const { conversationId, message } = action.payload;
      conversations = [...state];
      const index = conversations.findIndex((item: ConversationInfoType) => item.id === conversationId);
      conversations[index].unseen += !message.seen ? 1 : 0;
      conversations[index].latest_message = message;
      const item = conversations[index];
      conversations.splice(index, 1);
      conversations = [item, ...conversations];
      return conversations;
    case SEEN_CONVERSATION:
      const convId = action.payload;
      conversations = [...state];
      const idx = conversations.findIndex((item: ConversationInfoType) => item.id === convId);
      conversations[idx].unseen = 0;
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
      conversations[index].messages = [...conversations[index].messages, ...filteredMessages];
      return conversations;
    case CREATE_CONVERSATION_CONTENT:
      return [...state, action.payload];
    case CREATE_MESSAGE:
      conversationId = payload.conversationId;
      message = payload.message;
      conversations = [...state];
      index = conversations.findIndex((item: ConversationContentType) => item.id === conversationId);
      if (index !== -1) {
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
