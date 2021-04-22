import React from 'react';
import ConversationRender from '../common/ConversationRender';

interface Props {
  route: any;
  navigation: { push: any; navigate: any; goBack: any };
}

const GroupConversation: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const conversationId = route.params.groupId;

  return <ConversationRender conversationId={conversationId} navigation={navigation} isPrivate={false} />;
};

export default GroupConversation;
