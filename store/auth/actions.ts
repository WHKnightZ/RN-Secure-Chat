import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { rest } from '../../config';
import { callApi, rsa, generateKey } from '../../utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (payload: any) => {
  return async (dispatch: any) => {
    const { username } = payload;

    const response: any = await callApi({
      api: rest.login(),
      method: 'post',
      body: payload,
    });
    const { status, data } = response;
    if (status) {
      const privateKey = await AsyncStorage.getItem(`${username}-private`);
      if (!privateKey) return;
      rsa.setPrivateString(privateKey);
      if (!rsa.decrypt(data.test_message)) return;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
      await AsyncStorage.setItem('user', JSON.stringify(payload));
      dispatch({ type: LOGIN, payload: data });
    }
  };
};

export const registerAction = (payload: any) => {
  return async (dispatch: any) => {
    const { username, password } = payload;
    const { publicKey, privateKey } = generateKey();
    const testMessage = rsa.encrypt('SC');

    const response: any = await callApi({
      api: rest.register(),
      method: 'post',
      body: { username, password, pub_key: publicKey, test_message: testMessage },
    });
    const { status } = response;
    if (status) {
      await AsyncStorage.setItem(`${username}-private`, privateKey);
      dispatch(loginAction({ username, password }));
    }
  };
};
