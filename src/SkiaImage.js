import React from 'react';
import {
  Canvas,
  useImage,
  Skia,
  Path,
  useCanvasRef,
} from '@shopify/react-native-skia';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {Picture, PictureDimensions} from './Picture';
import GestureHandler from './GestureHandler';
import {Dimensions} from 'react-native';
import {useLinePathContext} from './LinePathContext';
const {width, height} = Dimensions.get('window');

const SkiaImage = ({style, imageUri}) => {
  const ref = useCanvasRef();
  const {LinePaths} = useLinePathContext();

  const skImage = useImage(imageUri);
  const pictureMatrix = useSharedValue(Skia.Matrix());

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
        {Array.isArray(LinePaths) &&
          LinePaths.map((value, index) => (
            <Path key={index} path={value.path} paint={value.paint} />
          ))}
      </Canvas>
      <GestureHandler
        matrix={pictureMatrix}
        dimensions={PictureDimensions}
        debug={false}
      />
    </Animated.View>
  );
};
export default SkiaImage;
