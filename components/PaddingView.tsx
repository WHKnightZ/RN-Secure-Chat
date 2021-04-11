import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
}

const PaddingView: React.FC<Props> = (props) => {
  const { style, children } = props;

  return <View style={[styles.container, style]}>{children}</View>;
};

export default PaddingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
});
