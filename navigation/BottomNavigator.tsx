import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Messenger, Group, Directory, Menu } from '../screens';
import { useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  // const convContent = useSelector((state: any) => state.convContent);
  // const unseen = convContent
  //   .map((i: any) => i.messages.filter((j: any) => j.seen === false).length)
  //   .reduce((a: any, b: any) => a + b, 0);
  const convInfo = useSelector((state: any) => state.convInfo);
  const unseen = convInfo.reduce((a: any, b: any) => a + b.unseen, 0);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Messenger"
        activeColor={colors.primary}
        inactiveColor={colors.secondary}
        shifting
        sceneAnimationEnabled
        barStyle={{ backgroundColor: colors.white }}>
        <Tab.Screen
          name="MessengerTab"
          component={Messenger}
          options={{
            tabBarLabel: 'Tin nhắn',
            tabBarBadge: unseen || null,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="comment-text-multiple" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="GroupTab"
          component={Group}
          options={{
            tabBarLabel: 'Nhóm',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="DirectoryTab"
          component={Directory}
          options={{
            tabBarLabel: 'Danh bạ',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-box-multiple" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="MenuTab"
          component={Menu}
          options={{
            tabBarLabel: 'Thêm',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="menu" color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
