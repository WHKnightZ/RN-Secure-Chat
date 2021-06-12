import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import TouchableOpacity from './TouchableOpacity';
import Text from './Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants';

interface Props {
  style?: ViewStyle;
  label?: string;
  checked: boolean;
  onPress?: any;
  size?: number;
}

const RadioButton: React.FC<Props> = (props) => {
  const { style, label, checked, onPress, size } = props;
  const textSize = size || 15;
  const iconSize = textSize + 4;

  return (
    <View style={[styles.row, style]}>
      <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
        <MaterialCommunityIcons
          name={checked ? 'radiobox-marked' : 'radiobox-blank'}
          size={iconSize}
          color={checked ? colors.cyan : colors.black}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: textSize, marginLeft: 10 }}>{label}</Text>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
