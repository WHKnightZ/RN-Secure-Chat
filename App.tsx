import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { callApi } from './utils';
import { baseAPI, rest } from './config';
import axios from 'axios';
import { store } from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';

import Auth from './screens/auth/Auth';
import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import { loginAction } from './store';

axios.defaults.baseURL = baseAPI;

const fetchFonts = () => {
  return Font.loadAsync({
    Quicksand: require('./assets/fonts/Quicksand_bold.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const login = async (username: string, password: string) => {
      const response: any = await callApi({
        api: rest.login(),
        method: 'post',
        body: { username, password },
      });

      const { status, data } = response;
      if (status) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
        dispatch(loginAction(data));
      }
    };

    login('NguyenKhanh', 'admin@1234');
  }, []);

  if (!fontLoaded || !auth.access_token) {
    return <AppLoading onError={() => {}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  return <Auth />;
  return (
    <View style={styles.container}>
      <BottomNavigator />
    </View>
  );
};

export default function Index() {
  return (
    <Provider store={store}>
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
