import React from 'react';
import { rest } from '../../config';
import ConversationRender from '../common/ConversationRender';
import { useSelector } from 'react-redux';
import { createGroupMessage, getGroupMessages, createGroupContent } from '../../store';

interface Props {
  route: any;
  navigation: { push: any; navigate: any; goBack: any };
}

const GroupConversation: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const conversationId = route.params.groupId;
  const convInfo = useSelector((state: any) => state.groupsInfo);
  const convContent = useSelector((state: any) => state.groupsContent);
  const index = convContent.findIndex((item: any) => item.id === conversationId);
  const conversation = index > -1 ? convContent[index] : null;

  const params = {
    navigation,
    conversationId,
    convInfo,
    conversation,
    apiGetConversationInfo: rest.getGroupInfo,
    createConversationContent: createGroupContent,
    getMessages: getGroupMessages,
    apiCreateMessage: rest.createGroupMessage,
    createMessage: createGroupMessage,
    isPrivate: false,
  };

  return <ConversationRender {...params} />;
};

export default GroupConversation;
