import React from 'react';
import { StyleSheet, Image } from 'react-native';

const mappingIcon = {
  '(y': require('./00.png'),
  ':D': require('./01.png'),
  '(D': require('./02.png'),
  '<3': require('./03.png'),
  'XO': require('./04.png'),
  ':3': require('./05.png'),
  'TT': require('./06.png'),
  '8,': require('./07.png'),
  '8X': require('./08.png'),
  'Zz': require('./09.png'),
  '': require('./10.png'),
  '(D': require('./11.png'),
  '(D': require('./12.png'),
  '(D': require('./13.png'),
  '(D': require('./14.png'),
  '(y': require('./15.png'),
  ':D': require('./16.png'),
  '(D': require('./17.png'),
  '(D': require('./18.png'),
  '(D': require('./19.png'),
  '(D': require('./20.png'),
  '(D': require('./21.png'),
  '(D': require('./22.png'),
  '(D': require('./23.png'),
  '(D': require('./24.png'),
  '(D': require('./25.png'),
  '(D': require('./26.png'),
  '(D': require('./27.png'),
};

const mappingSize = {
  sm: 20,
  md: 30,
  lg: 40,
};

interface Props {
  name: '(y)';
  size: 'sm' | 'md' | 'lg';
}

const Icon: React.FC<Props> = (props) => {
  const { name, size } = props;
  const wh = mappingSize[size];

  return <Image source={mappingIcon[name]} style={{ width: wh, height: wh }} />;
};

export default Icon;

const styles = StyleSheet.create({});
