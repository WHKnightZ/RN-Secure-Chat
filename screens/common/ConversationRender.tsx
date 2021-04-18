import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { Text, HeaderBar, TouchableOpacity, Loading, ModalLoading } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../constants';
import { callApi, RSAKey } from '../../utils';
import ConversationItem from './ConversationItem';
import { useDispatch, useSelector } from 'react-redux';
import { addPublicKey, seenConversation } from '../../store';

interface Props {
  navigation: any;
  conversationId: string;
  convInfo?: any;
  conversation: any;
  apiGetConversationInfo: (id: string) => string;
  createConversationContent: any;
  getMessages: any;
  apiCreateMessage: (id: string) => string;
  createMessage: any;
  isPrivate: boolean;
}

const Conversation: React.FC<Props> = (props) => {
  const {
    navigation,
    conversationId,
    convInfo,
    conversation,
    apiGetConversationInfo,
    createConversationContent,
    getMessages,
    apiCreateMessage,
    createMessage,
    isPrivate,
  } = props;

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const publicKeys = useSelector((state: any) => state.publicKeys);

  const userId = auth.user_id;
  const page = useRef<number>(1);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const refConversation = useRef<any>(null);
  const refInput = useRef<any>(null);

  const loadMoreMessages = async () => {
    setLoading(true);
    await getMessages(dispatch, { conversationId, page: page.current });
    setLoading(false);
  };

  useEffect(() => {
    if (!conversation) {
      const getConversationInfo = async () => {
        const response: any = await callApi({
          api: apiGetConversationInfo(conversationId),
          method: 'get',
        });
        const { status, data } = response;
        if (status) {
          createConversationContent(dispatch, {
            id: data.conversation_id,
            name: data.conversation_name,
            avatar: data.conversation_avatar,
            online: data.online,
            full: false,
            publicKeys: data.public_keys,
            messages: [],
          });
          for (const [key, value] of Object.entries(data.public_keys)) {
            if (!(key in publicKeys)) {
              const r = new RSAKey();
              r.setPublicString(value);
              dispatch(addPublicKey({ userId: key, publicKey: r }));
            }
          }
        }
      };
      getConversationInfo();
      return;
    }
    const seen = isPrivate ? { seenPrivate: conversationId } : { seenGroup: conversationId };
    dispatch(seenConversation(seen));
    if (conversation.messages.length === 0) loadMoreMessages();
  }, [conversation]);

  if (!conversation) return <ModalLoading loading={true} />;

  const avatar = conversation.avatar ? { uri: conversation.avatar } : require('../default-avatar.png');

  const renderItem = ({ item, index }: any) => {
    const isLast = index === 0 || conversation.messages[index].sender_id !== conversation.messages[index - 1].sender_id;
    return <ConversationItem key={item.id} {...item} userId={userId} isLast={isLast} />;
  };

  const handleEndReached = async () => {
    if (loading || conversation.full) return;
    console.log('Reached');
    page.current += 1;
    loadMoreMessages();
  };

  const send = async (text: string) => {
    if (text) setText('');
    refConversation.current.scrollToOffset({ animated: true, offset: 0 });
    refInput.current.focus();

    const messages: any = {};
    for (const [key, value] of Object.entries(publicKeys)) {
      const valueAny: any = value;
      messages[key] = valueAny?.encrypt(text);
    }

    const response: any = await callApi({
      method: 'post',
      api: apiCreateMessage(conversationId),
      body: { messages },
    });
    const { status, data } = response;
    if (status) {
      createMessage(dispatch, {
        conversationsInfo: convInfo,
        conversationId,
        message: { ...data, message: messages[userId] },
        seen: true,
      });
    }
  };

  let canInput = true;
  for (const key in conversation.publicKeys) {
    if (!(key in publicKeys)) {
      canInput = false;
      break;
    }
  }

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} isBack>
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
        {!canInput ? (
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
