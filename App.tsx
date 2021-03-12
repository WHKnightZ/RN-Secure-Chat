import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import * as Font from 'expo-font';
import { baseAPI, socketioURL } from './config';
import axios from 'axios';
import { store } from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Auth from './screens/auth/Auth';
import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import { loginAction, initSocketio } from './store';

axios.defaults.baseURL = baseAPI;

const fetchFonts = () => {
  return Font.loadAsync({
    Light: require('./assets/fonts/Quicksand_Light.ttf'),
    Regular: require('./assets/fonts/Quicksand_Regular.ttf'),
    Bold: require('./assets/fonts/Quicksand_bold.ttf'),
  });
};

const io = require('socket.io-client');

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [init, setInit] = useState(true);
  const [connectState, setConnectState] = useState(0);

  const auth = useSelector((state: any) => state.auth);
  const sio = useSelector((state: any) => state.sio);

  const dispatch = useDispatch();

  useEffect(() => {
    const socketio = io.connect(socketioURL);
    dispatch(initSocketio(socketio));

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

    sio.on('connect', () => {
      console.log('connected');
      setConnectState(1);
    });

    sio.on('disconnect', () => {
      console.log('disconnected');
    });

    sio.on('message', (data: any) => {
      console.log(data);
    });
  }, [sio]);

  if (!fontLoaded || init) {
    return <AppLoading onError={() => {}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  if (!auth.access_token) return <Auth />;

  if (connectState === 1) {
    sio.emit('auth', auth.access_token);
    setConnectState(2);
  }

  return (
    <View style={styles.container}>
      <BottomNavigator />
    </View>
  );
};

export default function Index() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#111" barStyle="light-content" />
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
