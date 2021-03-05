import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';

interface Props {
  children?: any;
}

const MySafeAreaView: React.FC<Props> = (props) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

export default MySafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 5,
  },
});
