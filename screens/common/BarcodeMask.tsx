import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Text } from '../../components';
import { colors } from '../../constants';

interface Props {
  width?: string | number;
  height?: string | number;
  edgeWidth?: string | number;
  edgeHeight?: string | number;
  edgeColor?: string;
  edgeBorderWidth?: string | number;
  edgeRadius?: number;
  backgroundColor?: string;
  outerMaskOpacity?: number;
}

const defaultProps: Props = {
  width: 240,
  height: 240,
  edgeWidth: 26,
  edgeHeight: 26,
  edgeColor: colors.primary,
  edgeBorderWidth: 6,
  edgeRadius: 10,
  backgroundColor: 'rgb(0, 0, 0)',
  outerMaskOpacity: 0.4,
};

const BarcodeMask: React.FC<Props> = (props) => {
  const {
    width,
    height,
    edgeWidth,
    edgeHeight,
    edgeColor,
    edgeBorderWidth,
    edgeRadius,
    backgroundColor,
    outerMaskOpacity,
  } = props;

  const edgeRadiusOffset = edgeRadius ? -Math.abs(edgeRadius / 3) : 0;
  const maskFrameStyle = { backgroundColor, opacity: outerMaskOpacity, flex: 1 };

  const _renderEdge = (edgePosition: any) => {
    const defaultStyle = {
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
    };
    const edgeBorderStyle: any = {
      topRight: {
        borderRightWidth: edgeBorderWidth,
        borderTopWidth: edgeBorderWidth,
        borderTopRightRadius: edgeRadius,
        top: edgeRadiusOffset,
        right: edgeRadiusOffset,
      },
      topLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderTopWidth: edgeBorderWidth,
        borderTopLeftRadius: edgeRadius,
        top: edgeRadiusOffset,
        left: edgeRadiusOffset,
      },
      bottomRight: {
        borderRightWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomRightRadius: edgeRadius,
        bottom: edgeRadiusOffset,
        right: edgeRadiusOffset,
      },
      bottomLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomLeftRadius: edgeRadius,
        bottom: edgeRadiusOffset,
        left: edgeRadiusOffset,
      },
    };
    return <View style={[defaultStyle, styles[edgePosition + 'Edge'], edgeBorderStyle[edgePosition]]} />;
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.finder, { width, height }]}></View>
      <Text style={{ color: colors.white }}>Di chuyển camera đến vùng chứa mã QR để quét</Text>
      <View style={styles.maskOuter}>
        <View style={[styles.maskRow, maskFrameStyle]} />
        <View style={[{ height }, styles.maskCenter]}>
          <View style={maskFrameStyle} />
          <View style={[styles.maskInner, { width, height, zIndex: 6, elevation: Platform.OS === 'android' ? 6 : 0 }]}>
            {_renderEdge('topLeft')}
            {_renderEdge('topRight')}
            {_renderEdge('bottomLeft')}
            {_renderEdge('bottomRight')}
          </View>
          <View style={maskFrameStyle} />
        </View>
        <View style={[styles.maskRow, maskFrameStyle]} />
      </View>
    </View>
  );
};

BarcodeMask.defaultProps = defaultProps;

export default BarcodeMask;

const styles: any = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    backgroundColor: 'transparent',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row',
  },
});
