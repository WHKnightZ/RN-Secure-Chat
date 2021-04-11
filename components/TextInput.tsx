import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  style?: any;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const MyTextInput: React.FC<Props> = (props) => {
  const { style, value, onChangeText, placeholder, secureTextEntry } = props;

  const params: any = {
    value,
    onChangeText,
    style: [styles.text, style],
    placeholder,
    secureTextEntry,
    // keyboardType: 'visible-password',
  };

  return <TextInput {...params} keyboardType="email-address" />;
};

export default MyTextInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Bold',
    color: '#333',
  },
});
