import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../components/Text';
import { colors } from '../../constants';
import { timestampToDate } from '../../utils';

interface Props {
  group_id: string;
  name: string;
  avatar: string;
  content: string;
  created_date: number;
}

const MessageItem: React.FC<Props> = (props) => {
  const { group_id, name, avatar, content, created_date } = props;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.messageTop}>
          <Text>{name}</Text>
          <Text style={styles.time}>{timestampToDate(created_date)}</Text>
        </View>
        <View style={styles.message}>
          <Text>{content}</Text>
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
