import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Image, Platform, Alert } from 'react-native';
import { Text, HeaderBar, PaddingView, TouchableOpacity, TextInput, RadioButton } from '../../components';
import { colors } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { rest } from '../../config';
import { callApi } from '../../utils';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const ChangePassword: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [password, setPassword] = useState({
    current: { value: '', show: false },
    new: { value: '', show: false },
    confirm: { value: '', show: false },
  });

  const changePassword = async () => {
    if (!password.current.value.trim() || !password.new.value.trim() || !password.confirm.value.trim()) {
      Alert.alert('Không được để trống trường nào!');
      return;
    }

    if (password.new.value !== password.confirm.value) {
      Alert.alert('Mật khẩu không khớp!');
      return;
    }

    const { status } = await callApi({
      method: 'put',
      api: rest.changePassword(),
      body: { current_password: password.current.value, new_password: password.new.value },
    });
    if (!status) Alert.alert('Sai mật khẩu hiện tại!');
    else navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: colors.white }}>
      <HeaderBar navigation={navigation} title="Đổi mật khẩu" isBack />
      <PaddingView>
        <Text>Mật khẩu mới</Text>
        <TextInput
          placeholder="Mật khẩu hiện tại"
          onChangeText={(value) => setPassword({ ...password, current: { ...password.current, value } })}
        />
        <TextInput
          placeholder="Mật khẩu mới"
          onChangeText={(value) => setPassword({ ...password, new: { ...password.new, value } })}
        />
        <TextInput
          placeholder="Nhập lại mật khẩu mới"
          onChangeText={(value) => setPassword({ ...password, confirm: { ...password.confirm, value } })}
        />
        <TouchableOpacity onPress={changePassword}>
          <Text>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </PaddingView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    marginVertical: 12,
  },
});
