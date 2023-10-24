import React from "react";
import { Button, StyleSheet, View } from "react-native";
import SkiaImage from "./SkiaImage";
import { SkiaView, useCanvasRef } from "@shopify/react-native-skia";
import { useLinePathContext } from "./LinePathContext";

const MainScreen = ({ navigation }) => {
  const { clearLinePaths, getSnapshots } = useLinePathContext();
  const canvasRef = useCanvasRef();
  const image = require("./zurich.jpg");
  return (
    <>
      <SkiaView style={styles.container}>
        <SkiaImage
          style={styles.skiaImageContainer}
          imageUri={image}
          canvasRef={canvasRef}
        />
      </SkiaView>
      <View style={styles.buttonContainer}>
        <Button
          title="Clear"
          onPress={() => {
            console.log("Clear!");
            clearLinePaths();
          }}
        />
        <Button
          title="Snapshot"
          onPress={() => {
            console.log("Snapshot!");
            getSnapshots({ canvasRef });
          }}
        />
        <Button
          title="Secondary"
          onPress={() => navigation.navigate("Secondary")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 92,
  },
  skiaImageContainer: {
    zIndex: 1,
  },
  buttonContainer: {
    flex: 8,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MainScreen;
