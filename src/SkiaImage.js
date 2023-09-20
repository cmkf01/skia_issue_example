import React from "react";
import { Dimensions } from "react-native";
import {
  Canvas,
  useImage,
  Skia,
  Path,
  Group,
  Rect,
} from "@shopify/react-native-skia";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Picture, PictureDimensions } from "./Picture";
import GestureHandler from "./GestureHandler";
import { useLinePathContext } from "./LinePathContext";

const { width, height } = Dimensions.get("window");

const SkiaImage = ({ style, imageUri, canvasRef }) => {
  const { linePaths } = useLinePathContext();

  const skImage = useImage(imageUri);
  const pictureMatrix = useSharedValue(Skia.Matrix());

  //for debugging
  const rectPaint = Skia.Paint();
  rectPaint.setColor(Skia.Color("yellow"));
  rectPaint.setAlphaf(0.5);
  // for debugging

  if (!skImage) {
    return null;
  }
  return (
    <Animated.View style={style}>
      <Canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}>
        <Picture image={skImage} matrix={pictureMatrix} />
        <Group matrix={pictureMatrix}>
          {Array.isArray(linePaths) &&
            linePaths.map((linePath, index) => (
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
                {/* for debugging */}
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
