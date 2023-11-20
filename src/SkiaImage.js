import React from "react";
import { Dimensions } from "react-native";
import {
  Canvas,
  useImage,
  Skia,
  Path,
  Group,
  rect,
  Image,
} from "@shopify/react-native-skia";
import { useSharedValue } from "react-native-reanimated";

import GestureHandler from "./GestureHandler";
import { useLinePathContext } from "./LinePathContext";

const { width, height } = Dimensions.get("window");

const SkiaImage = ({ imageUri, canvasRef }) => {
  const { linePaths } = useLinePathContext();

  const skImage = useImage(imageUri);
  const pictureMatrix = useSharedValue(Skia.Matrix());
  const size = useSharedValue({ width: 0, height: 0 });

  if (!skImage) {
    return null;
  }
  return (
    <>
      <Canvas ref={canvasRef} onSize={size} style={{ flex: 1 }}>
        <Group matrix={pictureMatrix}>
          <Image
            x={0}
            y={0}
            width={width}
            height={height}
            image={skImage}
            fit="cover"
          />
        </Group>
        <Group matrix={pictureMatrix}>
          {Array.isArray(linePaths) &&
            linePaths.map((linePath, index) => (
              <Path
                key={`${index}-path`}
                path={linePath.path}
                paint={linePath.paint}
              />
            ))}
        </Group>
      </Canvas>
      <GestureHandler
        matrix={pictureMatrix}
        dimensions={rect(0, 0, width, height)}
        debug={true}
      />
    </>
  );
};
export default SkiaImage;
