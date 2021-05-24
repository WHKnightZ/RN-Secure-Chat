import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { BASE_URL, rest } from './config';
import axios from 'axios';
import { store } from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import { loginAction } from './store';
import { Auth, ScanQR } from './screens';
import { callApi } from './utils';
import { fetchConversationsUnseen } from './store/common/actions';
import { addOnlineUser, fetchOnlineUsers, removeOnlineUser } from './store/onlineUsers/actions';
import { TypingConversationType, updateTypingConversation } from './store/typingConversations/actions';

axios.defaults.baseURL = BASE_URL;

const fetchFonts = () => {
  return Font.loadAsync({
    Light: require('./assets/fonts/Quicksand_Light.ttf'),
    Regular: require('./assets/fonts/Quicksand_Regular.ttf'),
    Bold: require('./assets/fonts/Quicksand_bold.ttf'),
  });
};

const CONNECTING = 0;
const CONNECTED = 1;
const LOGGED = 2;

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [init, setInit] = useState(true);
  const [connectState, setConnectState] = useState(CONNECTING);

  const auth = useSelector((state: any) => state.auth);
  const sio = useSelector((state: any) => state.sio);

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userString: any = await AsyncStorage.getItem('user');
      if (!userString) {
        setInit(false);
        return;
      }
      const user = JSON.parse(userString);
      await loginAction(dispatch, { ...user, isAuto: true });
      setInit(false);
    };

    tryLogin();
  }, []);

  useEffect(() => {
    if (!sio) return;

    sio.on?.('connect', () => {
      console.log('connected');
      setConnectState(CONNECTED);
    });

    sio.on?.('disconnect', () => {
      console.log('disconnected');
    });

    sio.on?.('online', (data: string) => {
      console.log('online: ', data);
      dispatch(addOnlineUser(data));
    });

    sio.on?.('offline', (data: string) => {
      console.log('offline: ', data);
      dispatch(removeOnlineUser(data));
    });

    sio.on?.('typing', (data: TypingConversationType) => {
      dispatch(updateTypingConversation(data));
    });
  }, [sio]);

  if (!fontLoaded || init) {
    return <AppLoading onError={() => {}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  if (!auth.access_token) return <Auth />;

  if (connectState === CONNECTED) {
    const getUnseenConversations = async () => {
      const { status, data }: any = await callApi({ method: 'get', api: rest.getUnseenConversations() });
      if (status) {
        dispatch(fetchConversationsUnseen({ unseenPrivate: data.unseen_private, unseenGroup: data.unseen_group }));
      }
    };
    const getOnlineUsers = async () => {
      const { status, data }: any = await callApi({ method: 'get', api: rest.getOnlineUsers() });
      if (status) {
        dispatch(fetchOnlineUsers(data));
      }
    };
    getUnseenConversations();
    getOnlineUsers();
    sio.emit('auth', auth.access_token);
    setConnectState(LOGGED);
  }

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigator />
      <ScanQR />
    </View>
  );
};

export default function Index() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor='#111' barStyle='light-content' />
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
  },
});
