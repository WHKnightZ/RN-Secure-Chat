import React from 'react';
import { rest } from '../../config';
import ConversationRender from '../common/ConversationRender';
import { useSelector } from 'react-redux';
import { createMessage, getMessages, createConversationContent } from '../../store';

interface Props {
  route: any;
  navigation: { push: any; navigate: any; goBack: any };
}

const Conversation: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const conversationId = route.params.conversationId;
  const convInfo = useSelector((state: any) => state.convInfo);
  const convContent = useSelector((state: any) => state.convContent);
  const index = convContent.findIndex((item: any) => item.id === conversationId);
  const conversation = index > -1 ? convContent[index] : null;

  const params = {
    navigation,
    conversationId,
    convInfo,
    conversation,
    apiGetConversationInfo: rest.getConversationInfo,
    createConversationContent,
    getMessages,
    apiCreateMessage: rest.createMessage,
    createMessage,
    isPrivate: true,
  };

  return <ConversationRender {...params} />;
};

export default Conversation;
