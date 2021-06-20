import React from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';

/**
 * Convert from props object to style object
 * @param param0 x, y, radius, color of dot
 */
const getStyles = ({ x, y, radius, dotColor }: any) => ({
  left: x,
  top: y,
  width: radius * 2,
  height: radius * 2,
  borderRadius: radius,
  backgroundColor: dotColor,
});

interface DotProps {
  x: number;
  y: number;
  radius: number;
  style: ViewStyle;
  dotColor: string;
}

const Dot: React.FC<DotProps> = (props) => <View style={[styles.container, props.style, getStyles(props)]} />;

export default Dot;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
