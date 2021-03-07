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
  showAvatar: boolean;
}

const ConversationItem: React.FC<Props> = (props) => {
  const { id, sender_id, message, created_date, seen, userId, showAvatar } = props;

  const avatar = require('../default-avatar.png');

  const render =
    userId === sender_id ? (
      <View style={styles.right}>
        <View style={styles.container}>
          <View style={styles.textWrapperRight}>
            <Text style={styles.textRight}>{message}</Text>
          </View>
          <FontAwesome
            style={styles.iconSeen}
            name={seen ? 'check-circle-o' : 'check-circle'}
            size={15}
            color={colors.gray}
          />
        </View>
      </View>
    ) : (
      <View style={styles.left}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>{showAvatar && <Image source={avatar} style={styles.avatar} />}</View>
          <View style={styles.textWrapperLeft}>
            <Text style={styles.textLeft}>{message}</Text>
          </View>
        </View>
      </View>
    );

  return <View>{render}</View>;
};

export default ConversationItem;

const styles = StyleSheet.create({
  left: { marginBottom: 20, marginTop: 5 },
  right: { marginBottom: 20, marginTop: 5, alignItems: 'flex-end' },
  container: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'flex-end',
    marginHorizontal: 6,
  },
  textWrapperLeft: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#e4e6eb',
  },
  textWrapperRight: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#0998fa',
  },
  textLeft: {
    fontFamily: 'Regular',
    fontSize: 14,
  },
  textRight: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: colors.white,
  },
  iconSeen: {
    marginLeft: 4,
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
});
