import React from 'react';
import { StyleSheet, Image, ImageStyle } from 'react-native';
import { iconCodes } from '../../constants';

const icons = [
  require('./0.png'),
  require('./1.png'),
  require('./2.png'),
  require('./3.png'),
  require('./4.png'),
  require('./5.png'),
  require('./6.png'),
  require('./7.png'),
  require('./8.png'),
  require('./9.png'),
  require('./10.png'),
  require('./11.png'),
  require('./12.png'),
  require('./13.png'),
  require('./14.png'),
  require('./15.png'),
  require('./16.png'),
  require('./17.png'),
  require('./18.png'),
  require('./19.png'),
  require('./20.png'),
  require('./21.png'),
  require('./22.png'),
];

const mappingIcon: any = {};

iconCodes.map((item: string, index: number) => {
  mappingIcon[item] = icons[index];
});

const mappingSize = {
  sm: 16,
  md: 26,
  lg: 36,
};

interface Props {
  name: typeof iconCodes[number];
  size: 'sm' | 'md' | 'lg';
  style?: ImageStyle;
}

const Icon: React.FC<Props> = (props) => {
  const { name, size, style } = props;
  const wh = mappingSize[size];

  return <Image source={mappingIcon[name]} style={[{ width: wh, height: wh }, style]} />;
};

export default Icon;

const styles = StyleSheet.create({});
