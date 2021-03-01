import React from 'react';
import { Text } from 'react-native';

interface Props {
  style?: any;
  children?: JSX.Element;
}

const defaultProps: Props = {
  style: '',
};

const Demo: React.FC<Props> = (props) => {
  return <Text {...props}>{props.children}</Text>;
};

Demo.defaultProps = defaultProps;

export default Demo;
