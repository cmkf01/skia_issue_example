import {Group, Image, rect} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export const PictureDimensions = rect(0, 0, width, height);

export const Picture = ({image, matrix}) => {
  return (
    <Group matrix={matrix}>
      <Image
        x={0}
        y={0}
        width={width}
        height={height}
        image={image}
        fit="cover"
      />
    </Group>
  );
};

Picture.propTypes = {
  matrix: PropTypes.any,
  image: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
};
