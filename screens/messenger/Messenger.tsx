import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, PaddingView, HeaderBar, TouchableOpacity } from '../../components';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../../constants';
import MessengerItem from './MessengerItem';
import Conversation from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../store';
import { ConversationInfoType, createConversationContent, createMessage } from '../../store/conversations/actions';
import { saveNavigation } from '../../store/common/actions';
import { rsa, RSAKey } from '../../utils';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Messenger: React.FC<Props> = (props) => {
  const { navigation } = props;

  const page = useRef<number>(1);

  const [loading, setLoading] = useState(false);
  const [full, setFull] = useState(false);
  const sio = useSelector((state: any) => state.sio);
  const convInfo = useSelector((state: any) => state.convInfo);
  const dispatch = useDispatch();

  const loadMoreConversations = async () => {
    setLoading(true);
    const size: number = await getConversations(dispatch, { page: page.current });
    if (size < 10) setFull(true);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(saveNavigation(navigation));
    console.log('Init Messenger');
    loadMoreConversations();
  }, []);

  useEffect(() => {
    if (!sio) return;

    sio.on?.('new_private_msg', (data: any) => {
      console.log(data);
      createMessage(dispatch, {
        conversationsInfo: convInfo,
        conversationId: data.sender_id,
        message: {
          id: data.id,
          avatar: null,
          created_date: data.created_date,
          message: data.message,
          seen: data.seen,
          sender_id: data.sender_id,
        },
      });
    });

    return () => sio.off?.('new_private_msg');
  }, [sio, convInfo]);

  const handleEndReached = () => {
    if (loading || full) return;
    console.log('Reached');
    page.current += 1;
    loadMoreConversations();
  };

  const handlePress = (item: ConversationInfoType) => {
    createConversationContent(dispatch, {
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      online: item.online,
      messages: [],
    });
    navigation.navigate('Conversation', { conversationId: item.id });
  };

  const renderItem = ({ item }: any) => {
    return <MessengerItem key={item.id} onPress={() => handlePress(item)} {...item} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Tin nhắn" items={['scanqr', 'search']} />
      <PaddingView>
        {loading && <ActivityIndicator animating={loading} size={30} color={colors.white} />}
        <FlatList
          style={styles.container}
          data={convInfo}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
        />
        <TouchableOpacity
          onPress={() => {
            const rsa = new RSAKey();
            rsa.setPublicString(
              JSON.stringify({
                n:
                  '88dd19aa485403721653ad037aff74ec47e7f48f6ba8508fa2c3774b5196cfbfd0dbd2fa50b27dbc9752a004762a2844e10b153cae237c4eb06e8155774c2a54cf957057b6c456c1286618711992e193513c2b4f78c40a84980ef170a050d5d325344a29dc40ecbefb9adb652343f6c7e816bb687ac80cffcba61cf7ea6a3a55',
                e: '10001',
              })
            );
            console.log(rsa.encrypt('ssd'));
          }}>
          <Text>SS</Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          Bạn có thể trò chuyện với những người đã cài đặt Secure Chat trên điện thoại của họ.
        </Text>
        <Text style={styles.note}>Nhấn Quét để quét mã QR của bạn bè.</Text>
        <Button
          onPress={() => navigation.navigate('DirectoryTab', { screen: 'AddContact', fromScreen: 'DirectoryTab' })}>
          Thêm liên lạc mới
        </Button>
      </PaddingView>
    </View>
  );
};

const MessengerStack: React.FC = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Conversation"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

export default MessengerStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: colors.primary,
  },
  note: {
    marginVertical: 10,
    color: colors.gray,
  },
});
