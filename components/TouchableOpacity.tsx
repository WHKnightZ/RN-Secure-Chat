import React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  style?: any;
  onPress?: () => void;
}

const MyTouchableOpacity: React.FC<Props> = (props) => {
  const { style, onPress, children } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.5}>
      {children}
    </TouchableOpacity>
  );
};

export default MyTouchableOpacity;
