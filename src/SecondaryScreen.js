import React from "react";
import { Dimensions, View, Text, Button, StyleSheet } from "react-native";
import { useLinePathContext } from "./LinePathContext";
import { Canvas, Image } from "@shopify/react-native-skia";

const SecondaryScreen = ({ navigation }) => {
  const { snapshots } = useLinePathContext();
  const { width, height } = Dimensions.get("window");
  if (snapshots.length === 0) {
    return (
      <View>
        <Text>Nothing to show</Text>
        <Button title="Return" onPress={() => navigation.navigate("Main")} />
      </View>
    );
  }

  return (
    <>
      <Canvas style={styles.skiaImageContainer}>
        <Image
          image={snapshots[0]}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="contain"
        />
      </Canvas>
      <View style={styles.buttonContainer}>
        <Button title="Return" onPress={() => navigation.navigate("Main")} />
        {/* {snapshots.map((snapshot, index) => ( */}
        {/* ))} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  skiaImageContainer: {
    zIndex: 1,
    flex: 90,
  },
  buttonContainer: {
    zIndex: 2,
    flex: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SecondaryScreen;
