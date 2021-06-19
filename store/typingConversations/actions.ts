export const UPDATE_TYPING_CONVERSATION = 'UPDATE_TYPING_CONVERSATION';

export type TypingConversationType = {
  conversationId: string;
  isTyping: boolean;
};

export const updateTypingConversation = (payload: TypingConversationType) => {
  return { type: UPDATE_TYPING_CONVERSATION, payload };
};
