import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Text from './Text';
import { colors } from '../constants';

interface Props {
  title: string;
  isBack?: boolean;
  item?: 'showqr' | 'scanqr' | 'search'[];
  navigation?: { goBack: () => void };
}

const HeaderBar: React.FC<Props> = (props) => {
  const { title, isBack, item, navigation } = props;

  if (isBack)
    return (
      <View style={styles.containerIsBack}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation?.goBack()}>
          <FontAwesome5 name="angle-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  containerIsBack: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 12,
  },
  iconBack: {
    marginRight: 10,
  },
  header: {
    marginLeft: 8,
    fontSize: 32,
    color: colors.primary,
  },
  title: {
    fontSize: 20,
  },
});
