import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, PaddingView, HeaderBar, Loading } from '../../components';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../../constants';
import MessengerItem from './MessengerItem';
import Conversation from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
// import { FlatList } from 'react-native-gesture-handler';
import { getConversations } from '../../store';
import { ConversationInfoType, createConversationContent, createMessage } from '../../store/conversations/actions';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: (routeName: string) => void; navigate: any; goBack: any };
}

const Messenger: React.FC<Props> = (props) => {
  const { navigation } = props;

  const page = useRef<number>(1);

  const [loading, setLoading] = useState(false);
  const [full, setFull] = useState(false);
  const sio = useSelector((state: any) => state.sio);
  const convInfo = useSelector((state: any) => state.convInfo);
  const dispatch = useDispatch();

  const loadMoreConversations = async () => {
    setLoading(true);
    const size: number = await getConversations(dispatch, { page: page.current });
    if (size < 10) setFull(true);
    setLoading(false);
  };

  useEffect(() => {
    console.log('Init Messenger');
    loadMoreConversations();
  }, []);

  useEffect(() => {
    if (!sio) return;

    sio.on('new_private_msg', (data: any) => {
      console.log(data);
      createMessage(dispatch, {
        conversationsInfo: convInfo,
        conversationId: data.sender_id,
        message: {
          id: data.id,
          avatar: null,
          created_date: data.created_date,
          message: data.message,
          seen: data.seen,
          sender_id: data.sender_id,
        },
      });
    });

    return () => sio.off('new_private_msg');
  }, [sio, convInfo]);

  const handleEndReached = () => {
    if (loading || full) return;
    console.log('Reached');
    page.current += 1;
    loadMoreConversations();
  };

  const handlePress = (item: ConversationInfoType) => {
    createConversationContent(dispatch, {
      id: item.id,
      name: item.name,
      avatar: item.name,
      online: item.online,
      messages: [],
    });
    navigation.navigate('Conversation', { conversationId: item.id });
  };

  const renderItem = ({ item }: any) => {
    return <MessengerItem key={item.id} onPress={() => handlePress(item)} {...item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Tin nhắn" items={['scanqr', 'search']} navigation={navigation} />
      <PaddingView>
        <Loading loading={loading} />
        <FlatList
          style={styles.container}
          data={convInfo}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
        />
        <Text style={styles.note}>
          Bạn có thể trò chuyện với những người đã cài đặt Secure Chat trên điện thoại của họ.
        </Text>
        <Text style={styles.note}>Nhấn Quét để quét mã QR của bạn bè.</Text>
        <Button onPress={() => navigation.navigate('DirectoryTab', { screen: 'AddContact' })}>Thêm liên lạc mới</Button>
      </PaddingView>
    </View>
  );
};

const MessengerStack: React.FC = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Conversation"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

export default MessengerStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: colors.primary,
  },
  note: {
    marginVertical: 10,
    color: colors.gray,
  },
});
