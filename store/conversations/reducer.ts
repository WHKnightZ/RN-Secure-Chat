import {
  GET_CONVERSATIONS,
  GET_MESSAGES,
  CREATE_CONVERSATION_INFO,
  CREATE_CONVERSATION_CONTENT,
  CREATE_MESSAGE,
  ConversationInfoType,
  ConversationContentType,
  MessageType,
} from './actions';

export const conversationsInfoReducer = (state = [], action: { type: string; payload: any }) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return [...state, ...action.payload];
    case CREATE_CONVERSATION_INFO:
      return [action.payload, ...state];
    case CREATE_MESSAGE:
      const { conversationId, message } = action.payload;
      let conversations: ConversationInfoType[] = [...state];
      const index = conversations.findIndex((item: ConversationInfoType) => item.id === conversationId);
      conversations[index].latest_message = message;
      const item = conversations[index];
      conversations.splice(index, 1);
      conversations = [item, ...conversations];
      return conversations;

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
      conversations[index].messages = [...conversations[index].messages, ...messages];
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

    default:
      return state;
  }
};
