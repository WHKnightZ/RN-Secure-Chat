import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, PaddingView, HeaderBar, MenuContainer, MenuItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/auth/actions';
import { colors } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();

function Group(props: any) {
  const { navigation } = props;

  return (
    <View>
      <HeaderBar title="Nhóm" />
    </View>
  );
}

function GroupStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Nhóm" component={Group} />
    </Stack.Navigator>
  );
}

export default GroupStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
