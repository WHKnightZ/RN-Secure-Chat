import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Text from './Text';
import { colors } from '../constants';

interface Props {
  icon: string;
  title: string;
  onPress: () => void;
  hideArrow?: boolean;
}

const MenuItem: React.FC<Props> = (props) => {
  const { icon, title, onPress, hideArrow } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <View style={styles.icon}>
          <FontAwesome5 name={icon} size={18} color={colors.gray} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome5 name="angle-right" size={24} color={colors.lightGray} />
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  title: {
    fontSize: 18,
  },
});
