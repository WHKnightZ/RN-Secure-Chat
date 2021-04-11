import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { initSocketio } from '../sio/actions';
import { BASE_URL, rest } from '../../config';
import { callApi, rsa, getKey } from '../../utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const io = require('socket.io-client');

export const loginAction = async (dispatch: any, payload: any) => {
  const { username, password, isAuto } = payload;

  const response: any = await callApi({
    api: rest.login(),
    method: 'post',
    body: { username, password },
  });
  const { status, data } = response;
  if (status) {
    const socketio: any = io.connect(BASE_URL, {
      transports: ['websocket'],
      jsonp: false,
      secure: true,
    });
    dispatch(initSocketio(socketio));

    const privateKey = await AsyncStorage.getItem(`${username}-private`);
    if (!privateKey) return;
    rsa.setPrivateString(privateKey);
    if (!rsa.decrypt(data.test_message)) return;
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
      return true;
    }
    return false;
  } else {
    if (!isAuto) Alert.alert('Sai tài khoản hoặc mật khẩu');
    return false;
  }
};

export const registerAction = async (dispatch: any, payload: any) => {
  const { username, password } = payload;
  const { publicKey, privateKey } = getKey();
  const testMessage = rsa.encrypt('SC');

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
