import React from 'react';
import { View, StyleSheet } from 'react-native';

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
    paddingTop: 30,
    paddingBottom: 5,
  },
});
