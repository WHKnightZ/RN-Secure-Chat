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

axios.defaults.baseURL = baseAPI;

const fetchFonts = () => {
  return Font.loadAsync({
    Quicksand: require('./assets/fonts/Quicksand_bold.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
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
