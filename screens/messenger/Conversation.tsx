import React from 'react';
import ConversationRender from '../common/ConversationRender';

interface Props {
  route: any;
  navigation: { push: any; navigate: any; goBack: any };
}

const Conversation: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const conversationId = route.params.conversationId;

  return <ConversationRender conversationId={conversationId} navigation={navigation} isPrivate={true} />;
};

export default Conversation;
