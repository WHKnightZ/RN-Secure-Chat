import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants';

interface Props {
  children?: any;
}

const MenuContainer: React.FC<Props> = (props) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};

export default MenuContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    borderStyle: 'solid',
    borderTopColor: colors.light,
    borderBottomColor: colors.light,
    marginTop: 20,
  },
});
