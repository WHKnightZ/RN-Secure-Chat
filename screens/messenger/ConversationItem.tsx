import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView, Text } from 'react-native';
import { PaddingView, HeaderBar } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../constants';

interface Props {
  id: string;
  sender_id: string;
  message: string;
  created_date: number;
  seen: boolean;
  userId: string;
  isLast: boolean;
}

const ConversationItem: React.FC<Props> = (props) => {
  const { id, sender_id, message, created_date, seen, userId, isLast } = props;

  const avatar = require('../default-avatar.png');

  const isMe = userId === sender_id;

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
      {!isMe && <View style={styles.avatarContainer}>{isLast && <Image source={avatar} style={styles.avatar} />}</View>}
      {message !== '[like]' ? (
        <Text
          style={{
            maxWidth: '70%',
            fontFamily: 'Regular',
            fontSize: 14,
            paddingHorizontal: 14,
            paddingVertical: 8,
            backgroundColor: isMe ? '#0998fa' : '#e4e6eb',
            borderRadius: 20,
            color: isMe ? 'white' : 'black',
          }}>
          {message}
        </Text>
      ) : (
        <FontAwesome style={styles.like} name={'thumbs-up'} size={26} color={colors.primary} />
      )}
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
