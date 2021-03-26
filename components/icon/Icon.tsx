import React from 'react';
import { StyleSheet, Image, ImageStyle } from 'react-native';
import { iconCodes } from '../../constants';

const mappingIcon: any = {};

iconCodes.map((item: string, index: number) => {
  mappingIcon[item] = require(`./${index}.png`);
});

const mappingSize = {
  sm: 20,
  md: 30,
  lg: 40,
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
