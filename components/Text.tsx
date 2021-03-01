import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
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
    fontFamily: 'Quicksand',
    color: '#333',
  },
});
