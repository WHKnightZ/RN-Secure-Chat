import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Animated, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text, Loading, TextInput } from '../../components';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { loginAction } from '../../store';

const LOGIN = 0;
const REGISTER = 1;

interface Props {}

const Auth: React.FC<Props> = (props) => {
  const [state, setState] = useState(LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [hLogin, setHLogin] = useState(new Animated.Value(0));
  const [hRegister, setHRegister] = useState(new Animated.Value(0));
  const [sizeCircle, setSizeCircle] = useState(new Animated.Value(0));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user);

  const login = async () => {
    if (!username || !password) {
      Alert.alert('Không được để trống trường nào');
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(loginAction({ username, password }));
    } catch (err) {
      Alert.alert(err.message);
      setIsLoading(false);
    }
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
    setIsLoading(true);
    try {
      Alert.alert('Đăng ký thành công');
      setState(LOGIN);
    } catch (err) {
      Alert.alert(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(hLogin, {
        toValue: 1,
        duration: 300,
      }),
      Animated.timing(hRegister, {
        toValue: state == REGISTER ? 100 : 0,
        duration: 300,
      }),
      Animated.timing(sizeCircle, {
        toValue: state != LOGIN ? 1 : 0,
        duration: 300,
      }),
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

  const hLogin1 = hLogin.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const hEmail = hLogin.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const btnText = state == LOGIN ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ';

  return (
    <LinearGradient
      colors={['#2CFFFF', '#EE5CEE']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Loading isLoading={isLoading} />
      <Text style={{ color: '#0823C4', fontSize: 36, marginRight: 30 }}>Happy</Text>
      <Text style={{ color: '#8833B4', fontSize: 36, marginBottom: 50, marginLeft: 30 }}>Cooking</Text>
      <View style={styles.buttons}>
        <View style={{ marginRight: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginBottom: 30 }} onPress={() => setState(LOGIN)}>
            <Text style={{ fontSize: 18, color: state == LOGIN ? '#444' : '#777' }}>Đăng nhập</Text>
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
          <TouchableOpacity style={{ marginBottom: 30 }} onPress={() => setState(1 - state)}>
            <Text style={{ fontSize: 18, color: state == LOGIN ? '#777' : '#444' }}>Đăng ký</Text>
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
          <FontAwesome style={{ marginLeft: 10 }} name="user" sizeCircle={18} color="#999" />
          <TextInput
            onChangeText={(value) => setUsername(value)}
            style={styles.textInput}
            placeholder="Nhập tên tài khoản"
          />
        </View>
        <View style={styles.formInput}>
          <FontAwesome style={{ marginLeft: 10 }} name="lock" sizeCircle={18} color="#999" />
          <TextInput
            onChangeText={(value) => setPassword(value)}
            style={styles.textInput}
            secureTextEntry
            placeholder="Nhập mật khẩu"
          />
        </View>
        <Animated.View style={{ height: hRegister, overflow: 'hidden' }}>
          <View style={styles.formInput}>
            <FontAwesome style={{ marginLeft: 10 }} name="lock" sizeCircle={18} color="#999" />
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
      <Text style={{ marginTop: 20, color: '#555' }}>Quên mật khẩu?</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E5EE',
  },
  buttons: {
    flexDirection: 'row',
  },
  form: {
    width: '90%',
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 10,
  },
  formInput: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 2,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
