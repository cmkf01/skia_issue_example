import React from "react";
import { Dimensions } from "react-native";
import {
  Canvas,
  useImage,
  Skia,
  Path,
  useCanvasRef,
  Group,
  Rect,
} from "@shopify/react-native-skia";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Picture, PictureDimensions } from "./Picture";
import GestureHandler from "./GestureHandler";
import { useLinePathContext } from "./LinePathContext";

const { width, height } = Dimensions.get("window");

const SkiaImage = ({ style, imageUri }) => {
  const ref = useCanvasRef();
  const { LinePaths } = useLinePathContext();

  const skImage = useImage(imageUri);

  const pictureMatrix = useSharedValue(Skia.Matrix());

  //for debugging
  const rectPaint = Skia.Paint();
  rectPaint.setColor(Skia.Color("yellow"));
  rectPaint.setAlphaf(0.5);

  // need to consider slop around bbox to ensure text is captured

  if (!skImage) {
    return null;
  }
  return (
    <Animated.View style={style}>
      <Canvas
        ref={ref}
        style={{
          width,
          height,
        }}>
        <Picture image={skImage} matrix={pictureMatrix} />
        <Group matrix={pictureMatrix}>
          {Array.isArray(LinePaths) &&
            LinePaths.map((linePath, index) => (
              <React.Fragment key={index}>
                <Path
                  key={`${index}-path`}
                  path={linePath.path}
                  paint={linePath.paint}
                />
                {/* for debugging */}
                <Rect
                  key={`${index}-rect`}
                  rect={linePath.bounds}
                  paint={rectPaint}
                />
              </React.Fragment>
            ))}
        </Group>
      </Canvas>
      <GestureHandler
        matrix={pictureMatrix}
        dimensions={PictureDimensions}
        debug={true}
      />
    </Animated.View>
  );
};
export default SkiaImage;

// LOG  {"__typename__": "\"Rect\"", "dispose": [Function dispose], "height": 44.81243896484375, "setLTRB": [Function setLTRB], "setXYWH": [Function setXYWH], "width": 61.234649658203125, "x": 95.27076721191406, "y": 295.2686767578125}
