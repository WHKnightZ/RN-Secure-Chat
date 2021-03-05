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

function Menu(props: any) {
  const { navigation } = props;

  const source = require('./default-avatar.png');
  const auth = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  return (
    <View>
      <HeaderBar title="Cá nhân" />
      <View>
        <TouchableOpacity style={styles.profile}>
          <View style={styles.info}>
            <View style={styles.avatar}>
              <Image source={source} style={{ width: 60, height: 60 }} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.username}>{auth.username}</Text>
              <Text style={styles.publicInfo}>Thông tin công khai</Text>
            </View>
          </View>
          <FontAwesome5 name="angle-right" size={24} color={colors.lightGray} />
        </TouchableOpacity>
      </View>
      <MenuContainer>
        <MenuItem icon="map-marked-alt" title="Tìm quanh đây" onPress={() => {}} />
        <MenuItem icon="wallet" title="Ví điện tử" onPress={() => {}} />
        <MenuItem icon="user-lock" title="Tiện ích quản lý mật khẩu" onPress={() => {}} />
        <MenuItem icon="clipboard-list" title="Tiện ích quản lý ghi chú" onPress={() => {}} />
        <MenuItem icon="lock" title="Đổi mật khẩu" onPress={() => {}} />
      </MenuContainer>
      <MenuContainer>
        <MenuItem icon="cog" title="Cài đặt" onPress={() => {}} />
        <MenuItem icon="question" title="Điều khoản" onPress={() => {}} />
        <MenuItem icon="trash" title="Xóa dữ liệu" onPress={() => {}} />
        <MenuItem
          icon="sign-out-alt"
          title="Đăng xuất"
          onPress={() => {
            logoutAction(dispatch);
          }}
          hideArrow
        />
      </MenuContainer>
    </View>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Cá nhân" component={Menu} />
    </Stack.Navigator>
  );
}

export default MenuStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    borderStyle: 'solid',
    borderTopColor: colors.light,
    borderBottomColor: colors.light,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  info: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#c5c5c5",
    overflow: 'hidden',
  },
  infoText: {
    marginLeft: 20,
    marginTop: 5
  },
  username: {
    fontSize: 20,
  },
  publicInfo: {
    fontSize: 12,
    color: colors.gray,
  },
});
