import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { Text, Loading, TextInput } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { loginAction, registerAction } from '../../store';
import { colors } from '../../constants';

const LOGIN = 0;
const REGISTER = 1;

const Auth: React.FC = () => {
  const [state, setState] = useState(LOGIN);
  const [loading, setLoading] = useState(false);
  const [hRegister] = useState(new Animated.Value(0));
  const [sizeCircle] = useState(new Animated.Value(0));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const dispatch = useDispatch();

  const login = async () => {
    if (!username || !password) {
      Alert.alert('Không được để trống trường nào');
      return;
    }
    setLoading(true);
    const status = await loginAction(dispatch, { username, password, isAuto: false });
    if (!status) setLoading(false);
  };

  const register = async () => {
    if (!username || !password) {
      Alert.alert('Không được để trống trường nào');
      return;
    }
    if (repassword != password) {
      Alert.alert('Mật khẩu không khớp');
      return;
    }
    setLoading(true);
    const status = await registerAction(dispatch, { username, password });
    if (!status) setLoading(false);
  };

  const timingHRegister: any = {
    toValue: state === LOGIN ? 0 : 50,
    duration: 300,
    useNativeDriver: false,
  };
  const timingSizeCircle: any = {
    toValue: state === LOGIN ? 0 : 1,
    duration: 300,
    useNativeDriver: false,
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(hRegister, timingHRegister),
      Animated.timing(sizeCircle, timingSizeCircle),
    ]).start();
  }, [state]);

  const sizeCircleL = sizeCircle.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 5],
  });

  const sizeCircleR = sizeCircle.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 50],
  });

  const btnText = state === LOGIN ? 'ĐĂNG NHẬP' : 'TẠO KHÓA';

  return (
    <ImageBackground source={require('./background.png')} style={styles.container}>
      <Loading loading={loading} />
      <Text style={{ color: colors.white, fontSize: 52, marginTop: 180, marginRight: 30 }}>Secure</Text>
      <Text style={{ color: colors.white, fontSize: 48, marginBottom: 80, marginLeft: 30 }}>Chat</Text>
      <KeyboardAvoidingView style={styles.center} behavior="height">
        <View style={styles.buttons}>
          <View style={{ marginRight: '10%', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginBottom: 30 }} onPress={() => setState(LOGIN)}>
              <Text style={{ fontSize: 18, color: state === LOGIN ? colors.white : '#bbb' }}>Đăng nhập</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                marginTop: 35,
              }}>
              <Animated.View
                style={{ borderRadius: 50, width: sizeCircleL, height: sizeCircleL, backgroundColor: '#FFF' }}
              />
            </View>
          </View>
          <View style={{ marginLeft: '10%', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginBottom: 30 }} onPress={() => setState(REGISTER)}>
              <Text style={{ fontSize: 18, color: state === REGISTER ? colors.white : '#bbb' }}>Tạo khóa</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                marginTop: 35,
              }}>
              <Animated.View
                style={{ borderRadius: 50, width: sizeCircleR, height: sizeCircleR, backgroundColor: '#FFF' }}
              />
            </View>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.formInput}>
            <FontAwesome style={{ marginLeft: 10 }} name="user" size={18} color="#999" />
            <TextInput
              onChangeText={(value) => setUsername(value)}
              style={styles.textInput}
              placeholder="Nhập tên tài khoản"
            />
          </View>
          <View style={styles.formInput}>
            <FontAwesome style={{ marginLeft: 10 }} name="lock" size={18} color="#999" />
            <TextInput
              onChangeText={(value) => setPassword(value)}
              style={styles.textInput}
              secureTextEntry
              placeholder="Nhập mật khẩu"
            />
          </View>
          <Animated.View style={{ height: hRegister, overflow: 'hidden' }}>
            <View style={styles.formInput}>
              <FontAwesome style={{ marginLeft: 10 }} name="lock" size={18} color="#999" />
              <TextInput
                onChangeText={(value) => setRepassword(value)}
                style={styles.textInput}
                secureTextEntry
                placeholder="Nhập lại mật khẩu"
              />
            </View>
          </Animated.View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={state === LOGIN ? login : register}
            style={{
              alignSelf: 'center',
              backgroundColor: '#E7938C',
              width: 120,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
              marginTop: 10,
            }}>
            <Text style={{ color: '#FFF' }}>{btnText}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 20, color: '#3f46ab' }}>Quên mật khẩu?</Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    backgroundColor: '#e0e5ee',
  },
  center: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 10,
  },
  formInput: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    height: 30,
  },
  textInput: {
    marginLeft: 20,
    width: '95%',
    fontSize: 16,
  },
  inputBox: {
    width: 100,
    height: 100,
  },
});

export default Auth;
