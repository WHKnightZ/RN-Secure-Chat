import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, PaddingView, HeaderBar } from '../../components';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../../constants';
import Conversation from './Conversation';
import MessengerRender from '../common/MessengerRender';

const Stack = createStackNavigator();

interface Props {
  navigation: any;
}

const Messenger: React.FC<Props> = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Tin nhắn" items={['scanqr', 'search']} />
      <PaddingView>
        <MessengerRender navigation={navigation} isPrivate={true} />
        <Text style={styles.note}>
          Bạn có thể trò chuyện với những người đã cài đặt Secure Chat trên điện thoại của họ.
        </Text>
        <Text style={styles.note}>Nhấn Quét để quét mã QR của bạn bè.</Text>
        <Button onPress={() => navigation.navigate('DirectoryTab', { screen: 'AddContact' })}>Thêm liên lạc mới</Button>
      </PaddingView>
    </View>
  );
};

const MessengerStack: React.FC = () => {
  return (
    <Stack.Navigator
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
