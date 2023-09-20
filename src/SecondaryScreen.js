import React from "react";
// import { Canvas, Image, Skia } from "@shopify/react-native-skia";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useLinePathContext } from "./LinePathContext";
import { Canvas, Image, Skia } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");
const scrollViewHeight = height - 56;

const SecondaryScreen = () => {
  const { snapshots } = useLinePathContext();
  console.log("snapshots length: ", snapshots.length);

  // const offscreen = Skia.Surface.MakeOffscreen;
  if (snapshots.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nothing to show</Text>
      </View>
    );
  } else {
    const img = Skia.Image.MakeImageFromEncoded(
      Skia.Data.fromBase64(snapshots[0]),
    );

    return (
      img && (
        <Canvas style={styles.canvas}>
          <Image
            image={img}
            x={0}
            y={0}
            width={width}
            height={scrollViewHeight}
            fit="contain"
          />
        </Canvas>
      )
    );
  }
};

const styles = StyleSheet.create({
  canvas: {
    height: scrollViewHeight,
  },
});

export default SecondaryScreen;
