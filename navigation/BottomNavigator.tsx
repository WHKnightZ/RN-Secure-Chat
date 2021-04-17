import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Messenger, Group, Directory, Menu } from '../screens';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const Label = (props: { isFocused: boolean; label: string; color: string }) => {
  const { isFocused, label, color } = props;
  const [fontSize] = useState(new Animated.Value(0));

  const timing: any = {
    toValue: isFocused ? 11 : 0,
    duration: 100,
    useNativeDriver: false,
  };

  useEffect(() => {
    Animated.timing(fontSize, timing).start();
  }, [isFocused]);

  return <Animated.Text style={{ fontFamily: 'Bold', fontSize, color }}>{label}</Animated.Text>;
};

const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const TabBarIcon = options.tabBarIcon;

        const isFocused = state.index === index;
        const color = isFocused ? colors.primary : colors.secondary;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // const onLongPress = () => {
        //   navigation.emit({
        //     type: 'tabLongPress',
        //     target: route.key,
        //   });
        // };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            // onPress={onPress}
            // onLongPress={onLongPress}
            onPressOut={onPress}
            activeOpacity={0.8}
            style={styles.tabBarItem}>
            {options.tabBarBadge > 0 && (
              <View style={styles.badgeWrapper}>
                <View style={styles.badgeCircle}>
                  <Text style={styles.badgeText}>{options.tabBarBadge}</Text>
                </View>
              </View>
            )}
            <TabBarIcon color={color}></TabBarIcon>
            <Label isFocused={isFocused} label={label} color={color} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomNavigator = () => {
  const unseenPrivate = useSelector((state: any) => state.common.unseenPrivate).length;
  const unseenGroup = useSelector((state: any) => state.common.unseenGroup).length;

  return (
    <NavigationContainer>
      <Tab.Navigator
        // initialRouteName="GroupTab"
        tabBar={TabBar}
        lazy={false}>
        <Tab.Screen
          name="MessengerTab"
          component={Messenger}
          options={{
            tabBarLabel: 'Tin nhắn',
            tabBarBadge: unseenPrivate,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="comment-text-multiple" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="GroupTab"
          component={Group}
          options={{
            tabBarLabel: 'Nhóm',
            tabBarBadge: unseenGroup,
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

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItem: { flex: 1, alignItems: 'center', position: 'relative' },
  badgeWrapper: {
    position: 'absolute',
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-end',
    elevation: 10,
  },
  badgeCircle: {
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Regular',
    fontSize: 10,
    color: colors.white,
  },
});
