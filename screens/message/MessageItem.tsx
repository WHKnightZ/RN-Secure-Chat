import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../components/Text';
import { colors } from '../../constants';
import { timestampToDate } from '../../utils';

interface Props {
  id: string;
  group_name: string;
  name: string;
  avatar?: string;
  create_date: number;
  modified_date: number;
  latest_message: {
    create_date: number;
    group_id: string;
    id: string;
    message_hash: string;
    sender_id: string;
  };
}

const MessageItem: React.FC<Props> = (props) => {
  const { id, group_name, avatar, latest_message } = props;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: avatar || 'https://i.pinimg.com/originals/89/59/2b/89592b3392fee110134235e95d80dbf7.jpg' }}
        />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.messageTop}>
          <Text>{group_name}</Text>
          <Text style={styles.time}>{timestampToDate(latest_message.create_date)}</Text>
        </View>
        <View style={styles.message}>
          <Text>{latest_message.message_hash}</Text>
        </View>
      </View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContainer: {
    flex: 4,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {},
  time: {
    fontSize: 12,
    color: colors.gray,
  },
});
