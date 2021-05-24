import { TypingConversationType, UPDATE_TYPING_CONVERSATION } from './actions';

const initialState: TypingConversationType[] = [];

export const typingConversationsReducer = (
  state = initialState,
  action: { type: string; payload: TypingConversationType }
) => {
  switch (action.type) {
    case UPDATE_TYPING_CONVERSATION:
      if (action.payload) {
        const newState = [...state];
        const existedConversation = newState.find(
          (item: TypingConversationType) => item.conversationId === action.payload.conversationId
        );
        if (existedConversation && existedConversation.isTyping !== action.payload.isTyping) {
          existedConversation.isTyping = action.payload.isTyping;
          return newState;
        }
        return [...newState, action.payload];
      }
      return state;
    default:
      return state;
  }
};
