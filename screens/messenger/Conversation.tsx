import React, { useEffect } from 'react';
import { rest } from '../../config';
import ConversationRender from '../common/ConversationRender';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getMessages, createConversationContent } from '../../store';
import { useIsFocused } from '@react-navigation/native';
import { changeFocus } from '../../store/common/actions';

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

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    dispatch(changeFocus(conversationId));
    return () => {
      dispatch(changeFocus(null));
    };
  }, [isFocused]);

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
