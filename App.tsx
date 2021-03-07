import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import * as Font from 'expo-font';
import { baseAPI } from './config';
import axios from 'axios';
import { store } from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Auth from './screens/auth/Auth';
import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import { loginAction } from './store';

axios.defaults.baseURL = baseAPI;

const fetchFonts = () => {
  return Font.loadAsync({
    Regular: require('./assets/fonts/Quicksand.ttf'),
    Bold: require('./assets/fonts/Quicksand_bold.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [init, setInit] = useState(false);

  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const tryLogin = async () => {
  //     const userString: any = await AsyncStorage.getItem('user');
  //     if (!userString) {
  //       setInit(false);
  //       return;
  //     }
  //     const user = JSON.parse(userString);
  //     await loginAction(dispatch, { ...user, isAuto: true });
  //     setInit(false);
  //   };

  //   tryLogin();
  // }, []);

  if (!fontLoaded || init) {
    return <AppLoading onError={() => {}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  // if (!auth.access_token) return <Auth />;

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
