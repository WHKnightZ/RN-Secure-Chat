import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {}

const PaddingView: React.FC<Props> = (props) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

export default PaddingView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
});
