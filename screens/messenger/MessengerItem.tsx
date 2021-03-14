import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from '../../components';
import Text from '../../components/Text';
import { colors } from '../../constants';
import { timestampToDate } from '../../utils';

interface Props {
  id: string;
  group_name: string;
  name: string;
  avatar?: string;
  created_date: number;
  modified_date: number;
  latest_message: {
    created_date: number;
    group_id: string;
    id: string;
    message: string;
    sender_id: string;
  } | null;
  onPress: () => void;
}

const MessengerItem: React.FC<Props> = (props) => {
  const { id, name, avatar, latest_message, onPress } = props;

  const avatarImage = avatar ? { uri: avatar } : require('../default-avatar.png');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={avatarImage} />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.messageTop}>
          <Text>{name}</Text>
          <Text style={styles.time}>{latest_message ? timestampToDate(latest_message.created_date) : ''}</Text>
        </View>
        <View style={styles.message}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textMessage}>
            {latest_message ? latest_message.message : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessengerItem;

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
    backgroundColor: '#e0e0e0',
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
  message: {
    marginTop: 4,
    width: '80%',
  },
  textMessage: {
    color: colors.darkGray,
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    color: colors.gray,
  },
});
