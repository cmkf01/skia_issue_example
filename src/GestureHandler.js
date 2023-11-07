import { Skia, notifyChange } from "@shopify/react-native-skia";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { toM4, translate, scale } from "./MatrixHelpers";
import { paint } from "./Paint";
import { useLinePathContext } from "./LinePathContext";

const GestureHandler = ({ matrix, dimensions, debug }) => {
  const { x, y, width, height } = dimensions;
  const origin = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue(Skia.Matrix());
  const currentPath = useSharedValue(Skia.Path.Make());

  const { addLinePath } = useLinePathContext();

  const pan = Gesture.Pan()
    .minPointers(2)
    .onChange(e => {
      translate(matrix, e.changeX, e.changeY);
    });

  const pinch = Gesture.Pinch()
    .onBegin(e => {
      origin.value = { x: e.focalX, y: e.focalY };
      offset.value.identity();
      offset.value.concat(matrix.value);
    })
    .onChange(e => {
      scale(matrix, offset.value, e.scale, origin.value);
    });

  const drawGesture = Gesture.Pan()
    .minPointers(1)
    .maxPointers(1)
    .onStart(e => {
      currentPath.value.moveTo(e.x, e.y);
      notifyChange(currentPath);
    })
    .onChange(e => {
      currentPath.value.lineTo(e.x, e.y);
      notifyChange(currentPath);
    })
    .onEnd(() => {
      const pathToDraw = {
        path: currentPath.value,
        paint: paint,
      };
      runOnJS(addLinePath)(pathToDraw);
      currentPath.value = Skia.Path.Make();
    });

  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      backgroundColor: debug ? "rgba(100, 200, 300, 0.4)" : "transparent",
      transform: [
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { matrix: toM4(matrix.value) },
        { translateX: width / 2 },
        { translateY: height / 2 },
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
