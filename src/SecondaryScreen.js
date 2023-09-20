import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useLinePathContext } from "./LinePathContext";
import { Canvas, Image } from "@shopify/react-native-skia";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const scrollViewHeight = height * 0.2;

const SecondaryScreen = () => {
  const { snapshots } = useLinePathContext();

  if (snapshots.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nothing to show</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={snapshots}
      renderItem={({ item }) => (
        <Canvas style={styles.canvas}>
          <Image
            image={item}
            x={0}
            y={0}
            width={width}
            height={scrollViewHeight}
            fit="contain"
          />
        </Canvas>
      )}
    />
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: scrollViewHeight,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SecondaryScreen;
