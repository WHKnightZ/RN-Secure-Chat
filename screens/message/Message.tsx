import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../components/Text';
import { rest } from '../../config';
import { colors } from '../../constants';
import { callApi } from '../../utils';
import MessageItem from './MessageItem';

interface Props {}

const Message: React.FC<Props> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useState<[]>([]);

  const getAllMessages = async () => {
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
    getAllMessages();
  }, []);

  const renderItem = ({ item }: { item: any }) => <MessageItem {...item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Tin nhắn</Text>
        <FlatList data={messages} renderItem={renderItem} keyExtractor={(item: { group_id: string }) => item.group_id} />
        <Text style={styles.note}>
          Bạn có thể trò chuyện với những người đã cài đặt Secure Chat trên điện thoại của họ.
        </Text>
        <Text style={styles.note}>Nhấn Quét để quét mã QR của bạn bè.</Text>
        <Button>Thêm liên lạc mới</Button>
      </View>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 10,
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
