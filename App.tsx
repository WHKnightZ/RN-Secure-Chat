import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { BASE_URL } from './config';
import axios from 'axios';
import { store } from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import { loginAction } from './store';
import { Auth, ScanQR } from './screens';
import { stringToBlocks } from './utils';
import { Icon, Text } from './components';

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

    sio.on?.('message', (data: any) => {
      console.log(data);
    });
  }, [sio]);

  if (!fontLoaded || init) {
    return <AppLoading onError={() => {}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  if (!auth.access_token) return <Auth />;

  if (connectState === CONNECTED) {
    sio.emit('auth', auth.access_token);
    setConnectState(LOGGED);
  }

  const render = (str: string) => {
    const arr = stringToBlocks(str);
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 6, alignItems: "flex-end" }}>
        {arr.map((item: any, index: number) => (
          <View key={index} style={{ paddingHorizontal: 4 }}>
            {item.type === 0 ? <Icon name={item.value} size="sm" /> : <Text>{item.value}</Text>}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigator />
      {render('toi la :D :D khanh day nha (y hi hi hi')}
      {render(':) :D 8D =) (y (y')}
      {render('dit me may :) :) :) :)')}
      {render(':D :D :D :D')}
      <ScanQR />
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
