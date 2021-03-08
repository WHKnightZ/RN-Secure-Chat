import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Text, PaddingView, HeaderBar, TouchableOpacity } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { rest } from '../../config';
import { colors } from '../../constants';
import { callApi } from '../../utils';
import ConversationItem from './ConversationItem';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  navigation: any;
}

const data = {
  conversation_id: 'bkinh812-esh4-22sm-mkss-0484ko240006',
  conversation_name: 'Nguyễn Khánh',
  conversation_avatar: '',
  online: true,
  messages: [
    {
      created_date: 1615012223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120003',
      message: 'Hello Ly',
      sender_id: '0b7a2102-7e73-11eb-bffd-0242ac120003',
      seen: true,
      avatar: '',
    },
    {
      created_date: 1615022223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120004',
      message: 'Hello Ly Chan, my name is Khanh2',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615032223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120005',
      message:
        '[like]',
      sender_id: '0b7a2102-7e73-11eb-bffd-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120006',
      message: 'Hello Ly Chan, my name is sadsadasd asdasd asdasdsa sadasdsad',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615012223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120023',
      message: 'Hello Ly Chan, my name is Khanh1',
      sender_id: '0b7a2102-7e73-11eb-bffd-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615012223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120013',
      message: 'Hello Ly Chan, my name is Khanh1',
      sender_id: '0b7a2102-7e73-11eb-bffd-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-17d3-0242ac120006',
      message: '[like]',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-2dd3-0242ac120006',
      message: 'Hello Khanh',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-37d3-0242ac12d006',
      message: 'Hello Ly Chan :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-47d3-0242ac120406',
      message: 'Hello Ly Chan, my name',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-57d3-0242ac110106',
      message: 'Hello Ly Chan, my n',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-67d3-0242ac120506',
      message: 'Hello Ly Chan',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-67d3-0242ac120044',
      message: 'Hello Ly Chan, my na',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-67d3-0242ac120036',
      message: 'Hello Ly',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-67d3-0242ac120026',
      message: 'Hello Ly Chan',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-67d3-0242ac120016',
      message: 'Hello Ly C',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
  ],
};

const Conversation: React.FC<Props> = (props) => {
  const { navigation } = props;

  const auth = useSelector((state: any) => state.auth);
  const userId = '0b7a2102-7e73-11eb-bffd-0242ac120003';
  const [page, setPage] = useState<number>(1);
  const [conversation, setConversation] = useState<any>(data);
  const [text, setText] = useState('');
  const refConversation = useRef<any>(null);
  const refInput = useRef<any>(null);

  const conversationImage = conversation.conversation_image ? { uri: conversation.conversation_image } : require('../default-avatar.png');

  useEffect(() => {}, []);

  const renderItem = ({ item, index }: any) => {
    const isLast = index === 0 || conversation.messages[index].sender_id !== conversation.messages[index - 1].sender_id;
    return <ConversationItem key={item.id} {...item} userId={userId} isLast={isLast} />;
  };

  const send = (text: string) => {
    if (text) setText('');
    refConversation.current.scrollToOffset({ animated: true, offset: 0 });
    refInput.current.focus();
    setConversation((conversation: any) => {
      return {
        ...conversation,
        messages: [
          {
            created_date: new Date().getTime() / 1000,
            id: Math.random().toString(),
            message: text,
            sender_id: userId,
            seen: false,
          },
          ...conversation.messages,
        ],
      };
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar isBack navigation={navigation}>
        <View style={styles.header}>
          <View style={styles.conversationImageContainer}>
            <Image style={styles.conversationImage} source={conversationImage} />
          </View>
          <View style={styles.conversationTitle}>
            <Text style={styles.conversationName}>{conversation.conversation_name}</Text>
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
        onEndReached={() => console.log('x')}
        onEndReachedThreshold={0.2}
      />
      <View style={styles.footer}>
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
        <TouchableOpacity style={styles.buttonSend} onPress={() => (text ? send(text) : send('[like]'))}>
          <FontAwesome name={text ? 'send' : 'thumbs-up'} size={24} color={colors.primary} />
        </TouchableOpacity>
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
  conversationImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  conversationImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  conversationTitle: {
    marginLeft: 20,
  },
  conversationName: {
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
