import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, PaddingView, HeaderBar } from '../../components';
import { Button } from 'react-native-paper';
import { colors } from '../../constants';
import CreateGroup from './CreateGroup';
import MessengerItem from '../messenger/MessengerItem';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupMessage, getGroups } from '../../store';
import { ConversationInfoType } from '../../store/conversations/actions';
import GroupConversation from './GroupConversation';

const Stack = createStackNavigator();

interface Props {
  navigation: any;
}

const Group: React.FC<Props> = (props) => {
  const { navigation } = props;

  const page = useRef<number>(1);

  const [loading, setLoading] = useState(false);
  const [full, setFull] = useState(false);
  const sio = useSelector((state: any) => state.sio);
  const groupsInfo = useSelector((state: any) => state.groupsInfo);
  const dispatch = useDispatch();

  const loadMoreGroups = async () => {
    setLoading(true);
    const size: number = await getGroups(dispatch, { page: page.current });
    if (size < 10) setFull(true);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreGroups();
  }, []);

  useEffect(() => {
    if (!sio) return;

    sio.on?.('new_group_msg', (data: any) => {
      createGroupMessage(dispatch, {
        conversationsInfo: groupsInfo,
        conversationId: data.group_id,
        message: {
          id: data.id,
          avatar: null,
          created_date: data.created_date,
          message: data.message,
          seen: data.seen,
          sender_id: data.sender_id,
        },
        seen: false,
      });
    });

    return () => sio.off?.('new_group_msg');
  }, [sio, groupsInfo]);

  const handleEndReached = () => {
    console.log('Reached');
  };

  const handlePress = (item: ConversationInfoType) => {
    navigation.navigate('GroupConversation', { groupId: item.id });
  };

  const renderItem = ({ item }: any) => {
    return <MessengerItem key={item.id} onPress={() => handlePress(item)} {...item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Nhóm" items={['scanqr', 'search']} />
      <PaddingView>
        <FlatList
          style={styles.container}
          data={groupsInfo}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
        />
        <Text style={styles.note}>
          Trò chuyện nhóm với giao thức bảo mật hoàn toàn mới. Chỉ những người trong nhóm mới có thể đọc được tin nhắn.
        </Text>
        <Button onPress={() => navigation.push('CreateGroup')}>Tạo Nhóm Mới</Button>
      </PaddingView>
    </View>
  );
};

const GroupStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="GroupConversation" component={GroupConversation} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
    </Stack.Navigator>
  );
};

export default GroupStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  note: {
    marginVertical: 10,
    color: colors.gray,
  },
});
