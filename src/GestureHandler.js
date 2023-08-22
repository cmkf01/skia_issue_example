import {Skia} from '@shopify/react-native-skia';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {toM4, translate, scale} from './MatrixHelpers';

const GestureHandler = ({matrix, dimensions, debug}) => {
  const {x, y, width, height} = dimensions;
  const origin = useSharedValue(Skia.Point(0, 0));
  const offset = useSharedValue(Skia.Matrix());

  const pan = Gesture.Pan()
    .averageTouches(true)
    .minPointers(2)
    .onChange(e => {
      matrix.value = translate(matrix.value, e.changeX, e.changeY);
    });

  const pinch = Gesture.Pinch()
    .onStart(e => {
      origin.value = Skia.Point(e.focalX, e.focalY);
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = scale(offset.value, e.scale, origin.value);
    });

  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor: debug ? 'rgba(100, 200, 300, 0.4)' : 'transparent',
      transform: [
        {translateX: -width / 2},
        {translateY: -height / 2},
        {matrix: toM4(matrix.value)},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });
  const gesture = Gesture.Simultaneous(pinch, pan);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};

export default GestureHandler;
