import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, PaddingView, HeaderBar } from '../../components';
import { createStackNavigator } from '@react-navigation/stack';
import { rest } from '../../config';
import { colors } from '../../constants';
import { callApi } from '../../utils';
import MessengerItem from './MessengerItem';
import Conversation from './Conversation';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: (routeName: string) => void };
}

const Messenger: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useState<[]>([]);

  const getListChats = async () => {
    const response: any = await callApi({
      api: rest.getListChats(page),
      method: 'get',
    });
    const { status, data } = response;
    if (status) {
      setMessages(data);
    }
  };

  useEffect(() => {
    getListChats();
  }, []);

  return (
    <ScrollView>
      <HeaderBar title="Tin nhắn" items={['scanqr', 'search']} />
      <PaddingView>
        {messages.map((item: any) => (
          <MessengerItem key={item.id} onPress={() => navigation.push('Conversation')} {...item} />
        ))}
        <Text style={styles.note}>
          Bạn có thể trò chuyện với những người đã cài đặt Secure Chat trên điện thoại của họ.
        </Text>
        <Text style={styles.note}>Nhấn Quét để quét mã QR của bạn bè.</Text>
        <Button>Thêm liên lạc mới</Button>
      </PaddingView>
    </ScrollView>
  );
};

const MessengerStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Conversation"
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
