import React from 'react';
import Icon from './icon/Icon';
import Text from './Text';

interface Props {
  color?: string;
  blocks: { type: 0 | 1; value: string }[];
  size: 'sm' | 'md' | 'lg';
}

const TextIcon: React.FC<Props> = (props) => {
  const { color, blocks, size } = props;

  return (
    // <View style={{ flexDirection: 'row', paddingVertical: 6, alignItems: 'flex-end', flexWrap: 'wrap' }}>
    <Text style={{ marginHorizontal: 4, paddingVertical: 6, color, overflow: 'visible' }}>
      {blocks.map((item: any, index: number) => {
        if (item.type === 0)
          return (
            <Text key={index}>
              {' '}
              <Icon name={item.value} size={size} />{' '}
            </Text>
          );
        return item.value;
      })}
    </Text>
    // </View>
  );
};

export default TextIcon;
