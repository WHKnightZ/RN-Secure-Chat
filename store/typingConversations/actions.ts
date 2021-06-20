export const UPDATE_TYPING_CONVERSATION = 'UPDATE_TYPING_CONVERSATION';

type TypingConversationType = {
  conversationId: string;
  userId: string;
  typing: boolean;
};

export const updateTypingConversation = (payload: TypingConversationType) => {
  return { type: UPDATE_TYPING_CONVERSATION, payload };
};

export { TypingConversationType };
