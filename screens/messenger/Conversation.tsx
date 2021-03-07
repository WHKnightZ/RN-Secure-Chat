import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Text, PaddingView, HeaderBar } from '../../components';
import { FontAwesome5 } from '@expo/vector-icons';
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
  group_id: 'bkinh812-esh4-22sm-mkss-0484ko240006',
  group_name: 'Nguyễn Khánh',
  group_image: '',
  online: true,
  avatars: [],
  messages: [
    {
      created_date: 1615012223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120003',
      message: 'Hello Ly Chan, my name is Khanh1',
      sender_id: '0b7a2102-7e73-11eb-bffd-0242ac120003',
      seen: true,
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
      message: 'Hello Ly Chan, my name is Khanh3, may la mot thang mat loz',
      sender_id: '0b7a2102-7e73-11eb-bffd-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-97d3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-17d3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-2dd3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-37d3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-47d3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-57d3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
      sender_id: 'b9bdf710-7ea1-11eb-b5df-0242ac120003',
      seen: true,
    },
    {
      created_date: 1615052223,
      id: '906f3c06-7ea2-11eb-67d3-0242ac120006',
      message: 'Hello Ly Chan, my name is Khanh4, are you ok today? I want to kill you :)',
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

  const groupImage = conversation.group_image ? { uri: conversation.group_image } : require('../default-avatar.png');

  useEffect(() => {}, []);

  const renderItem = ({ item, index }: any) => {
    const showAvatar = index === 0 || conversation.messages[index].sender_id !== conversation.messages[index - 1].sender_id;
    return <ConversationItem key={item.id} {...item} userId={userId} showAvatar={showAvatar} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBar isBack navigation={navigation}>
        <View style={styles.header}>
          <View style={styles.groupImageContainer}>
            <Image style={styles.groupImage} source={groupImage} />
          </View>
          <View style={styles.groupTitle}>
            <Text style={styles.groupName}>{conversation.group_name}</Text>
            <Text style={styles.online}>{conversation.online ? 'Đang hoạt động' : 'Không hoạt động'}</Text>
          </View>
        </View>
      </HeaderBar>
      <FlatList style={styles.conversation} inverted data={conversation.messages} renderItem={renderItem} />
      <View style={styles.footer}>
        <TextInput style={styles.input} placeholder="Nhập nội dung..." />
        <FontAwesome5 name="thumbs-up" size={20} color={colors.primary} />
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
  groupImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  groupTitle: {
    marginLeft: 10,
  },
  groupName: {
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
    padding: 6,
    marginRight: 10,
  },
});
