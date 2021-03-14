import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  style?: any;
}

const MyText: React.FC<Props> = (props) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Bold',
    color: '#333',
  },
});
