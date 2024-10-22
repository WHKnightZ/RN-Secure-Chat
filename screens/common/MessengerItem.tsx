import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from '../../components';
import Text from '../../components/Text';
import { colors } from '../../constants';
import { timestampToDate } from '../../utils';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  id: string;
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
  unseens: any[];
}

const MessengerItem: React.FC<Props> = (props) => {
  const { id, name, avatar, latest_message, onPress, unseens } = props;

  const unseen = unseens?.includes(id);
  const avatarImage = avatar ? { uri: avatar } : require('../default-avatar.png');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={avatarImage} />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.messageTop}>
          <Text style={{ color: unseen ? colors.lightBlack : colors.darkGray }}>{name}</Text>
          <Text style={{ color: unseen ? colors.primary : colors.gray, fontSize: 12 }}>
            {latest_message ? timestampToDate(latest_message.created_date) : ''}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.message}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ fontSize: 13, color: unseen ? colors.lightBlack : colors.darkGray }}>
              {latest_message ? latest_message.message : ''}
            </Text>
          </View>
          {unseen && (
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 }}>
              <FontAwesome name="circle" size={14} color={colors.accent} />
            </View>
          )}
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
