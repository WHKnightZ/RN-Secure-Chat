import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../constants';
import Text from './Text';
import TouchableOpacity from './TouchableOpacity';

interface Props {
  style?: ViewStyle;
  onPress?: any;
  icon?: string;
  label?: string;
}

const MyButton: React.FC<Props> = (props) => {
  const { style, onPress, icon, label } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    width: '100%',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Bold',
    color: colors.light2,
    fontSize: 15,
  },
});
