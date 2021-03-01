import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomNavigator from './navigation/BottomNavigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    Quicksand: require('./assets/fonts/Quicksand_bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading onError={() => {}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  return (
    <View style={styles.container}>
      <BottomNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
  },
});
