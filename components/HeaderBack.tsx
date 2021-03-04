import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Text from './Text';
import { colors } from '../constants';

interface Props {
  title: string;
  navigation: { goBack: () => void };
}

const HeaderBack: React.FC<Props> = (props) => {
  const { title, children, navigation } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 18,
  },
});
