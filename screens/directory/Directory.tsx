import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, PaddingView, HeaderBar } from '../../components';
import AddContact from './AddContact';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Directory: React.FC<Props> = (props) => {
  const { navigation } = props;

  return (
    <ScrollView>
      <HeaderBar title="Danh bạ" items={['scanqr', 'search']} />
      <PaddingView>
        <Button onPress={() => navigation.push('AddContact')}>Thêm liên lạc mới</Button>
      </PaddingView>
    </ScrollView>
  );
};

const DirectoryStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Directory" component={Directory} />
      <Stack.Screen name="AddContact" component={AddContact} />
    </Stack.Navigator>
  );
};

export default DirectoryStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
