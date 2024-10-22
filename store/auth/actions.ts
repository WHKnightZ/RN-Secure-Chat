import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { initSocketio } from '../sio/actions';
import { BASE_URL, rest } from '../../config';
import { callApi, rsa, generateKey } from '../../utils';
import { getFriends } from '../friends/actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_AUTH = 'UPDATE_AUTH';

const io = require('socket.io-client');

export const loginAction = async (dispatch: any, payload: any) => {
  const { username, password, auth } = payload;
  let status = true;
  let data = auth;
  if (!auth) {
    const response: any = await callApi({
      api: rest.login(),
      method: 'post',
      body: { username, password },
    });
    status = response.status;
    data = response.data;
  }
  if (status) {
    const privateKey = await AsyncStorage.getItem(`${username}-private`);
    if (!privateKey) {
      Alert.alert('Không thể xác thực Khóa riêng tư');
      return;
    }
    rsa.setPrivateString(privateKey);
    if (!rsa.decrypt(data.test_message)) {
      Alert.alert('Không thể xác thực Khóa riêng tư');
      return;
    }

    const socketio: any = io.connect(BASE_URL, {
      transports: ['websocket'],
      jsonp: false,
      secure: true,
    });
    dispatch(initSocketio(socketio));

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
    await AsyncStorage.setItem('user', JSON.stringify(payload));
    const response2: any = await callApi({
      api: rest.getUserById(data.user_id),
      method: 'get',
    });
    const status2 = response2.status;
    if (status2) {
      const data2 = response2.data;
      dispatch({ type: LOGIN, payload: { ...data2, ...data } });

      // get all friends when login successfully
      getFriends(dispatch);
      return true;
    }
    return false;
  } else {
    if (!auth) Alert.alert('Sai tài khoản hoặc mật khẩu');
    return false;
  }
};

export const registerAction = async (dispatch: any, payload: any) => {
  const { username, password } = payload;

  const { publicKey, privateKey, testMessage } = generateKey();

  const response: any = await callApi({
    api: rest.register(),
    method: 'post',
    body: { username, password, pub_key: publicKey, test_message: testMessage },
  });
  const { status } = response;
  if (status) {
    await AsyncStorage.setItem(`${username}-private`, privateKey);
    await loginAction(dispatch, { username, password });
    return true;
  } else {
    Alert.alert('Tài khoản đã tồn tại');
    return false;
  }
};

export const logoutAction = async (dispatch: any) => {
  callApi({
    api: rest.logout(),
    method: 'delete',
  });
  await AsyncStorage.setItem('user', '');
  dispatch({ type: LOGOUT });
};

export const updateAuth = (payload: {
  avatar_path?: string;
  display_name?: string;
  gender?: boolean;
  pub_key?: string;
  test_message?: string;
}) => {
  return { type: UPDATE_AUTH, payload };
};
