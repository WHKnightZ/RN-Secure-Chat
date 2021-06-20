import { TypingAnimation } from '../../components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface Props {
  avatar: string;
}

const ConversationTypingItem: React.FC<Props> = (props) => {
  const { avatar } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
        marginTop: 5,
        paddingHorizontal: 6,
        alignItems: 'flex-end',
      }}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View
        style={{
          height: 36,
          width: 70,
          backgroundColor: '#e4e6eb',
          borderRadius: 20,
          paddingHorizontal: 14,
          paddingVertical: 8,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TypingAnimation />
      </View>
    </View>
  );
};

export default ConversationTypingItem;

const styles = StyleSheet.create({
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
    marginRight: 8,
  },
});
