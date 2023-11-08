import { Skia } from "@shopify/react-native-skia";
import React, { useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { toM4 } from "./MatrixHelpers";
import { paint } from "./Paint";
import { useLinePathContext } from "./LinePathContext";

const GestureHandler = ({ matrix, dimensions, debug }) => {
  const { x, y, width, height } = dimensions;
  const currentPath = useSharedValue(Skia.Path.Make());

  const { addLinePath } = useLinePathContext();

  const drawGesture = Gesture.Pan()
    .runOnJS(true)
    .minPointers(1)
    .maxPointers(1)
    .onBegin(e => {
      currentPath.value.moveTo(e.x, e.y);
    })
    .onChange(e => {
      currentPath.value.lineTo(e.x, e.y);
    })
    .onEnd(() => {
      const pathToDraw = {
        path: currentPath.value,
        paint: paint,
        bounds: currentPath.value.getBounds(),
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
