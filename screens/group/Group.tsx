import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, PaddingView, HeaderBar } from '../../components';
import { Button } from 'react-native-paper';
import { colors } from '../../constants';
import CreateGroup from './CreateGroup';
import GroupConversation from './GroupConversation';
import MessengerRender from '../common/MessengerRender';

const Stack = createStackNavigator();

interface Props {
  navigation: any;
}

const Group: React.FC<Props> = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Nhóm" items={['scanqr', 'search']} />
      <PaddingView>
        <MessengerRender navigation={navigation} isPrivate={false} />
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
