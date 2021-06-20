import { TypingConversationType, UPDATE_TYPING_CONVERSATION } from './actions';

const initialState: { [key: string]: string[] } = {};

export const typingConversationsReducer = (
  state = initialState,
  action: { type: string; payload: TypingConversationType }
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_TYPING_CONVERSATION:
      const { conversationId, userId, typing } = payload;
      let newState = { ...state };
      const conversation = newState[conversationId];
      if (typing) {
        if (conversation) {
          if (conversation.findIndex((item) => item === userId) === -1)
            newState[conversationId] = [...conversation, userId];
        } else newState[conversationId] = [userId];
      } else {
        if (conversation) newState[conversationId] = conversation.filter((item) => item !== userId);
      }
      return newState;

    default:
      return state;
  }
};
