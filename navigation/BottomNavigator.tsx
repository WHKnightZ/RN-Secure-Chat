import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Message, Group, Directory, Menu } from '../screens';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Message"
        activeColor={colors.primary}
        inactiveColor={colors.secondary}
        shifting
        sceneAnimationEnabled
        barStyle={{ backgroundColor: colors.white }}>
        <Tab.Screen
          name="Message"
          component={Message}
          options={{
            tabBarLabel: 'Tin nhắn',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="comment-text-multiple" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Group"
          component={Group}
          options={{
            tabBarLabel: 'Nhóm',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Directory"
          component={Directory}
          options={{
            tabBarLabel: 'Danh bạ',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-box-multiple" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Menu"
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
