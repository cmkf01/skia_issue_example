import { Skia, notifyChange } from "@shopify/react-native-skia";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { toM4 } from "./MatrixHelpers";
import { paint } from "./Paint";

const GestureHandler = ({ matrix, dimensions, debug, addLinePath }) => {
  const { x, y, width, height } = dimensions;
  const currentPath = useSharedValue(Skia.Path.Make());

  const drawGesture = Gesture.Pan()
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

  return (
    <GestureDetector gesture={drawGesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};

export default GestureHandler;
