import React from 'react';
import {Canvas, useImage, Skia} from '@shopify/react-native-skia';
import PropTypes from 'prop-types';
import {useSharedValue} from 'react-native-reanimated';
import {Picture, PictureDimensions} from './Picture';
import GestureHandler from './GestureHandler';
import {Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const SkiaImage = ({imageUri, canManipulate}) => {
  const skImage = useImage(imageUri);
  const pictureMatrix = useSharedValue(Skia.Matrix());

  if (!skImage) {
    return null;
  }

  return (
    <View>
      <Canvas
        style={{
          width: width,
          height: height,
        }}>
        <Picture image={skImage} matrix={pictureMatrix} />
      </Canvas>
      <GestureHandler
        matrix={pictureMatrix}
        dimensions={PictureDimensions}
        debug={true}
      />
    </View>
  );
};

SkiaImage.propTypes = {
  imageUri: PropTypes.number.isRequired,
  canManipulate: PropTypes.bool,
};

export default SkiaImage;
