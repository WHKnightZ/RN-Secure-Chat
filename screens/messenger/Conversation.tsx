import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Text, PaddingView, HeaderBar, TouchableOpacity, Loading } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { rest } from '../../config';
import { colors } from '../../constants';
import { callApi } from '../../utils';
import ConversationItem from './ConversationItem';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { createMessage, getMessages } from '../../store';
import { seenConversation } from '../../store/conversations/actions';

interface Props {
  route: any;
  navigation: { push: any; navigate: any; goBack: any };
}

const Conversation: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const conversationId = route.params.conversationId;

  const auth = useSelector((state: any) => state.auth);
  const convInfo = useSelector((state: any) => state.convInfo);
  const convContent = useSelector((state: any) => state.convContent);

  const userId = auth.user_id;
  const page = useRef<number>(1);
  const [loading, setLoading] = useState(false);
  const [loadingInput, setLoadingInput] = useState(false);
  const [full, setFull] = useState(false);
  const [text, setText] = useState('');
  const refConversation = useRef<any>(null);
  const refInput = useRef<any>(null);

  const index = convContent.findIndex((item: any) => item.id === conversationId);
  const conversation = convContent[index];
  const dispatch = useDispatch();

  const avatar = conversation.avatar ? { uri: conversation.avatar } : require('../default-avatar.png');

  const loadMoreMessages = async () => {
    setLoading(true);
    const size: number = await getMessages(dispatch, { conversationId, page: page.current });
    if (size < 20) setFull(true);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(seenConversation(conversationId));
    if (conversation.messages.length === 0) loadMoreMessages();
  }, []);

  const renderItem = ({ item, index }: any) => {
    const isLast = index === 0 || conversation.messages[index].sender_id !== conversation.messages[index - 1].sender_id;
    return <ConversationItem key={item.id} {...item} userId={userId} isLast={isLast} />;
  };

  const handleEndReached = async () => {
    if (loading || full) return;
    console.log('Reached');
    page.current += 1;
    loadMoreMessages();
  };

  const send = async (text: string) => {
    if (text) setText('');
    refConversation.current.scrollToOffset({ animated: true, offset: 0 });
    refInput.current.focus();
    setLoadingInput(true);
    const response: any = await callApi({
      method: 'post',
      api: rest.createMessage(conversationId),
      body: { message: text },
    });
    setLoadingInput(false);
    const { status, data } = response;
    if (status) {
      createMessage(dispatch, { conversationsInfo: convInfo, conversationId, message: { ...data, seen: true } });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar parent="Messenger" isBack>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={avatar} />
          </View>
          <View style={styles.title}>
            <Text style={styles.name}>{conversation.name}</Text>
            <Text style={styles.online}>{conversation.online ? 'Đang hoạt động' : 'Không hoạt động'}</Text>
          </View>
        </View>
      </HeaderBar>
      <FlatList
        ref={refConversation}
        style={styles.conversation}
        inverted
        data={conversation.messages}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading ? <Loading /> : null}
      />

      <View style={styles.footer}>
        {loadingInput ? (
          <Loading />
        ) : (
          <>
            <TextInput
              ref={refInput}
              style={styles.input}
              value={text}
              onChangeText={(v) => setText(v)}
              onSubmitEditing={() => {
                if (text) send(text);
              }}
              placeholder="Nhập nội dung..."
            />
            <TouchableOpacity style={styles.buttonSend} onPress={() => (text ? send(text) : send('(y)'))}>
              <FontAwesome name={text ? 'send' : 'thumbs-up'} size={24} color={colors.primary} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  title: {
    marginLeft: 20,
  },
  name: {
    fontSize: 13,
    color: colors.primary,
    marginBottom: 3,
  },
  online: {
    fontSize: 10,
    color: colors.gray,
  },
  conversation: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  input: {
    flex: 1,
    fontFamily: 'Bold',
    backgroundColor: '#f2f3f4',
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  buttonSend: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
  },
});
