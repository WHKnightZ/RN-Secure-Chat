import React from 'react';
import { View } from 'react-native';
import { stringToBlocks } from '../utils';
import Icon from './icon/Icon';
import Text from './Text';

interface Props {
  str: string;
}

const TextIcon: React.FC<Props> = (props) => {
  const { str } = props;

  const { arr, noText } = stringToBlocks(str);

  if (noText) return <View></View>

  console.log(arr);

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 6, alignItems: 'flex-end' }}>
      {arr.map((item: any, index: number) => (
        <View key={index} style={{ paddingHorizontal: 4 }}>
          {item.type === 0 ? <Icon name={item.value} size="sm" /> : <Text>{item.value}</Text>}
        </View>
      ))}
    </View>
  );
};

export default TextIcon;
