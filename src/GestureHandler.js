import {Skia, vec} from '@shopify/react-native-skia';
import React, {useRef} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {toM4, translate, scale} from './MatrixHelpers';
import {paint} from './Paint';
import {useLinePathContext} from './LinePathContext';

const GestureHandler = ({matrix, dimensions, debug}) => {
  const {x, y, width, height} = dimensions;
  const origin = useSharedValue(Skia.Point(0, 0));
  const offset = useSharedValue(Skia.Matrix());
  const currentPath = useRef(null);

  const {addLinePath} = useLinePathContext();

  const pan = Gesture.Pan()
    .averageTouches(true)
    .minPointers(2)
    .onChange(e => {
      matrix.value = translate(matrix.value, e.changeX, e.changeY);
    });

  const pinch = Gesture.Pinch()
    .onStart(e => {
      offset.value = matrix.value;
      origin.value = vec(e.focalX, e.focalY);
    })
    .onChange(e => {
      matrix.value = scale(offset.value, e.scale, origin.value);
    });

  const drawGesture = Gesture.Pan()
    .runOnJS(true)
    .minPointers(1)
    .maxPointers(1)
    .onStart(e => {
      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(e.x, e.y);
    })
    .onChange(e => {
      console.log(e);
      currentPath.current.lineTo(e.x, e.y);
    })
    .onEnd(() => {
      const pathToDraw = {path: currentPath.current, paint: paint};
      addLinePath(pathToDraw);
    })
    .onFinalize(() => {
      currentPath.current = null;
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

  const gesture = Gesture.Race(drawGesture, Gesture.Simultaneous(pinch, pan));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};

export default GestureHandler;
