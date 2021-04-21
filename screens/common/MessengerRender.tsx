import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '../../constants';
import MessengerItem from './MessengerItem';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupMessage, getConversations, getGroups } from '../../store';
import { ConversationInfoType, createMessage } from '../../store/conversations/actions';

interface Props {
  navigation: any;
  isPrivate: boolean;
}

const MessengerRender: React.FC<Props> = (props) => {
  const { navigation, isPrivate } = props;
  const dispatch = useDispatch();

  const page = useRef<number>(1);

  const [loading, setLoading] = useState(false);
  const [full, setFull] = useState(false);
  const sio = useSelector((state: any) => state.sio);
  const focus = useSelector((state: any) => state.common.focus);

  const convInfo = useSelector((state: any) => (isPrivate ? state.convInfo : state.groupsInfo));
  const unseens = useSelector((state: any) => (isPrivate ? state.common.unseenPrivate : state.common.unseenGroup));

  let event: any;
  let getConvs: any;
  let createMsg: any;
  let handlePress: any;

  if (isPrivate) {
    event = 'new_private_msg';
    getConvs = getConversations;
    createMsg = createMessage;
    handlePress = (item: ConversationInfoType) => {
      navigation.navigate('Conversation', { conversationId: item.id });
    };
  } else {
    event = 'new_group_msg';
    getConvs = getGroups;
    createMsg = createGroupMessage;
    handlePress = (item: ConversationInfoType) => {
      navigation.navigate('GroupConversation', { groupId: item.id });
    };
  }

  const loadMoreConversations = async () => {
    setLoading(true);
    const size: number = await getConvs(dispatch, { page: page.current });
    if (size < 10) setFull(true);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreConversations();
  }, []);

  useEffect(() => {
    if (!sio) return;

    sio.on?.(event, (data: any) => {
      const convId = isPrivate ? data.sender_id : data.group_id;
      createMsg(dispatch, {
        conversationsInfo: convInfo,
        conversationId: convId,
        message: {
          id: data.id,
          avatar: null,
          created_date: data.created_date,
          message: data.message,
          seen: data.seen,
          sender_id: data.sender_id,
        },
        seen: focus === convId,
      });
    });

    return () => sio.off?.(event);
  }, [sio, convInfo, focus]);

  const handleEndReached = () => {
    if (loading || full) return;
    console.log('Reached');
    page.current += 1;
    loadMoreConversations();
  };

  const renderItem = ({ item }: any) => {
    return <MessengerItem key={item.id} onPress={() => handlePress(item)} {...item} unseens={unseens} />;
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator animating={loading} size={30} color={colors.gray} style={{ margin: 6 }} />}
      <FlatList
        style={styles.container}
        data={convInfo}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default MessengerRender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
