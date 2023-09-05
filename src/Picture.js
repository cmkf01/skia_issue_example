import { Group, Image, rect } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// const newWidth = width * 0.9; // 80% of original width
// const newHeight = height * 0.9; // 80% of original height
// const xOffset = (width - newWidth) / 2; // Center the scaled image
// const yOffset = (height - newHeight) / 2; // Center the scaled image

export const PictureDimensions = rect(0, 0, width, height);

export const Picture = ({ image, matrix }) => {
  return (
    <Group matrix={matrix}>
      <Image
        x={0}
        y={0}
        width={width}
        height={height}
        image={image}
        fit="contain"
      />
    </Group>
  );
};
