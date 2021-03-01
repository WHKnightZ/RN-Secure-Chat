import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../../components/Text';
import { colors } from '../../constants';
import { callApi } from '../../utils';
import MessageItem from './MessageItem';

interface Props {}

const data = [
  {
    group_id: '123',
    name: 'khanh',
    avatar: 'https://petsily.vn/wp-content/uploads/2020/01/cho-shiba-petsily-duc-3-thang-nhap-nga-3-600x600.jpg',
    content: 'asd',
    created_date: 3214214,
  },
  {
    group_id: '124',
    name: 'khanh214',
    avatar: 'https://petsily.vn/wp-content/uploads/2020/01/cho-shiba-petsily-duc-3-thang-nhap-nga-3-600x600.jpg',
    content: 'asd124',
    created_date: 3214214,
  },
];

const Message: React.FC<Props> = (props) => {
  const renderItem = ({
    item,
  }: {
    item: { group_id: string; name: string; avatar: string; content: string; created_date: number };
  }) => <MessageItem {...item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tin nhắn</Text>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item: { group_id: string }) => item.group_id} />
      <Text style={styles.note}>
        Bạn có thể trò chuyện với những người đã cài đặt Secure Chat trên điện thoại của họ.
      </Text>
      <Text style={styles.note}>Nhấn Quét để quét mã QR của bạn bè.</Text>
      <Button>Thêm liên lạc mới</Button>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
