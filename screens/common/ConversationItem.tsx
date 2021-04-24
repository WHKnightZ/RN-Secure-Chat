import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextIcon } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../constants';
import { stringToBlocks } from '../../utils';

interface Props {
  id: string;
  sender_id: string;
  message: string;
  created_date: number;
  seen: boolean;
  userId: string;
  isLast: boolean;
  users: any;
}

const ConversationItem: React.FC<Props> = (props) => {
  const { id, sender_id, message, seen, userId, isLast, users } = props;
  const isMe = userId === sender_id;
  const { blocks, noText } = stringToBlocks(message);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        marginBottom: isLast ? 20 : 8,
        marginTop: 5,
        paddingHorizontal: 6,
        alignItems: 'flex-end',
      }}>
      {!isMe && (
        <View style={styles.avatarContainer}>
          {isLast && <Image source={{ uri: users[sender_id].avatar }} style={styles.avatar} />}
        </View>
      )}

      <View
        style={{
          maxWidth: '70%',
          paddingHorizontal: 4,
        }}>
        {!noText ? (
          <View
            style={{
              backgroundColor: isMe ? '#0998fa' : '#e4e6eb',
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}>
            <TextIcon color={isMe ? colors.white : colors.black} blocks={blocks} size="sm" />
          </View>
        ) : (
          <TextIcon blocks={blocks} size="md" />
        )}
      </View>
      {isMe && (
        <FontAwesome
          style={styles.iconSeen}
          name={seen ? 'check-circle' : 'check-circle-o'}
          size={15}
          color={colors.gray}
        />
      )}
    </View>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  iconSeen: {
    marginLeft: 6,
  },
  avatarContainer: {
    width: 28,
    height: 28,
    marginRight: 4,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
  },
  like: {
    marginLeft: 6,
  },
});
