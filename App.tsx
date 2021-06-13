import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { BASE_URL, rest } from './config';
import axios from 'axios';
import { persistor, store } from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import { loginAction } from './store';
import { Auth, ScanQR } from './screens';
import { callApi } from './utils';
import { fetchConversationsUnseen } from './store/common/actions';
import { PersistGate } from 'redux-persist/lib/integration/react';
import SecurityLevel from './screens/common/SecurityLevel';

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
      await loginAction(dispatch, { ...user, auth });
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

    sio.on?.('message', (data: any) => {
      console.log(data);
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
    getUnseenConversations();
    sio.emit('auth', auth.access_token);
    setConnectState(LOGGED);
  }

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigator />
      <ScanQR />
      <SecurityLevel />
    </View>
  );
};

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="#111" barStyle="light-content" />
        <App />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
  },
});
