import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  style?: any;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const MyTextInput: React.FC<Props> = (props) => {
  const { style, onChangeText, placeholder, secureTextEntry } = props;
  return (
    <TextInput
      onChangeText={onChangeText}
      style={[styles.text, style]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}>
      {props.children}
    </TextInput>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand',
    color: '#333',
  },
});
