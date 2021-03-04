import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, SafeAreaView, PaddingView } from '../../components';
import AddContact from './AddContact';

const Stack = createStackNavigator();

function Directory(props: any) {
  const { navigation } = props;

  return (
    <SafeAreaView>
      <PaddingView>
        <Text>Danh bạ!</Text>
        <Button onPress={() => navigation.push('Thêm bạn')}>Thêm liên lạc mới</Button>
      </PaddingView>
    </SafeAreaView>
  );
}

function DirectoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Danh bạ" component={Directory} />
      <Stack.Screen name="Thêm bạn" component={AddContact} />
    </Stack.Navigator>
  );
}

export default DirectoryStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
