import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { getSin } from '../../utils';

import Dot from './Dot';

interface TypingAnimationProps {
  style?: ViewStyle;
  dotStyles?: ViewStyle;
  dotColor?: string;
  dotMargin?: number;
  dotAmplitude?: number;
  dotSpeed?: number;
  dotRadius?: number;
  dotY?: number;
  dotX?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = (props) => {
  const {
    style = {},
    dotStyles = {},
    dotColor = '#777',
    dotMargin = 6,
    dotAmplitude = 4,
    dotSpeed = 0.15,
    dotRadius = 3,
    dotY = -2,
    dotX = 0,
  } = props;
  const [state, setState] = useState({ y1: 0, y2: 0, y3: 0, currentAnimationTime: 0 });
  const frameAnimationRequest = useRef<number>();

  const animation = () => {
    setState((prevState) => ({
      y1: dotY + dotAmplitude * getSin(prevState.currentAnimationTime),
      y2: dotY + dotAmplitude * getSin(prevState.currentAnimationTime - 1),
      y3: dotY + dotAmplitude * getSin(prevState.currentAnimationTime - 2),
      currentAnimationTime: prevState.currentAnimationTime + dotSpeed,
    }));
    frameAnimationRequest.current = requestAnimationFrame(animation);
  };

  useEffect(() => {
    frameAnimationRequest.current = requestAnimationFrame(animation);

    return () => cancelAnimationFrame(frameAnimationRequest.current as number);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Dot x={dotX - dotRadius - dotMargin} y={state.y1} radius={dotRadius} style={dotStyles} dotColor={dotColor} />
      <Dot x={dotX} y={state.y2} radius={dotRadius} style={dotStyles} dotColor={dotColor} />
      <Dot x={dotX + dotRadius + dotMargin} y={state.y3} radius={dotRadius} style={dotStyles} dotColor={dotColor} />
    </View>
  );
};

export default TypingAnimation;

const styles = StyleSheet.create({
  container: {},
});
