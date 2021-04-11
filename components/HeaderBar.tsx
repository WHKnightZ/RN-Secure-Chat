import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Text from './Text';
import { colors } from '../constants';
import TouchableOpacity from './TouchableOpacity';
import { useDispatch, useSelector } from 'react-redux';
import { showScanQR } from '../store';

type ItemType = 'showqr' | 'scanqr' | 'search';

interface Props {
  parent?: string;
  title?: string;
  isBack?: boolean;
  items?: ItemType[];
}

const mappingIcon = {
  showqr: 'qrcode',
  scanqr: 'qrcode',
  search: 'search',
};

const HeaderBar: React.FC<Props> = (props) => {
  const { parent, title, isBack, items, children } = props;
  const dispatch = useDispatch();
  const navigation = useSelector((state: any) => state.common.navigation);

  if (isBack)
    return (
      <View style={styles.containerIsBack}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.replace(parent)}>
          <FontAwesome5 name="angle-left" size={28} color="black" />
        </TouchableOpacity>
        {title ? <Text style={styles.title}>{title}</Text> : <View>{children}</View>}
      </View>
    );

  const mappingNavigate = {
    showqr: () => {},
    scanqr: () => dispatch(showScanQR()),
    search: () => navigation.navigate('DirectoryTab', { screen: 'SearchContact' }),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.items}>
        {items?.map((item, index) => (
          <TouchableOpacity style={styles.buttonItem} key={index} onPress={mappingNavigate[item]}>
            <FontAwesome5 name={mappingIcon[item]} size={15} color={colors.darkGray} />
          </TouchableOpacity>
        ))}
      </View>
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
    justifyContent: 'space-between',
  },
  containerIsBack: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 8,
  },
  iconBack: {
    paddingHorizontal: 10,
  },
  header: {
    marginLeft: 8,
    fontSize: 32,
    color: colors.primary,
  },
  title: {
    fontSize: 20,
  },
  items: {
    flexDirection: 'row',
  },
  buttonItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.light2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});
