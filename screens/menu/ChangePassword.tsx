import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput } from 'react-native';
import { Text, HeaderBar, PaddingView, Button, TouchableOpacity } from '../../components';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../constants';
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

  const renderInput = (name: 'current' | 'new' | 'confirm', placeholder: string) => {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!password[name].show}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(value) => {
            let newPassword = { ...password };
            newPassword[name].value = value;
            setPassword(newPassword);
          }}
        />
        <TouchableOpacity
          style={{ width: 24, alignItems: 'center' }}
          onPress={() => {
            let newPassword = { ...password };
            newPassword[name].show = !newPassword[name].show;
            setPassword(newPassword);
          }}>
          <FontAwesome5 name={password[name].show ? 'eye-slash' : 'eye'} size={14} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <HeaderBar navigation={navigation} title="Đổi mật khẩu" isBack />
      <PaddingView style={{ marginHorizontal: 10 }}>
        <Text style={styles.title}>Mật khẩu mới</Text>
        <Text style={styles.info}>Mật khẩu mới có thể bao gồm ký tự viết thường, hoa, số và ký tự đặc biệt</Text>
        {renderInput('current', 'Mật khẩu hiện tại')}
        {renderInput('new', 'Mật khẩu mới')}
        {renderInput('confirm', 'Nhập lại mật khẩu mới')}
        <Button style={styles.submit} onPress={changePassword} label="Đổi mật khẩu" />
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
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 14,
  },
  info: {
    textAlign: 'center',
    marginVertical: 18,
    fontSize: 16,
  },
  inputBorder: {
    marginVertical: 10,
    paddingVertical: 8,
    borderStyle: 'solid',
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    marginVertical: 10,
    paddingVertical: 8,
    borderStyle: 'solid',
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Bold',
  },
  submit: {
    marginVertical: 24,
  },
});
