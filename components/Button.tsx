import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  style?: any;
}

const MyButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.text, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Bold',
    color: '#333',
  },
});
