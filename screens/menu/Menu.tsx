import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, HeaderBar, MenuContainer, MenuItem, TouchableOpacity } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/auth/actions';
import { colors } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Menu: React.FC<Props> = (props) => {
  const { navigation } = props;

  const source = require('../default-avatar.png');
  const auth = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <HeaderBar title="Cá nhân" items={['showqr', 'search']} />
      <View>
        <TouchableOpacity style={styles.profile}>
          <View style={styles.info}>
            <Image source={source} style={styles.avatar} />
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
    </ScrollView>
  );
};

const MenuStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
};

export default MenuStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    backgroundColor: '#f3f3f3',
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
    backgroundColor: '#e0e0e0',
  },
  infoText: {
    marginLeft: 20,
    marginTop: 5,
  },
  username: {
    fontSize: 20,
    marginBottom: 5,
  },
  publicInfo: {
    fontSize: 13,
    color: colors.gray,
  },
});
