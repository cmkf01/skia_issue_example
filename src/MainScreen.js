import React from "react";
import { Button, StyleSheet, View } from "react-native";
import SkiaImage from "./SkiaImage";
import { useCanvasRef } from "@shopify/react-native-skia";
import { useLinePathContext } from "./LinePathContext";

const MainScreen = ({ navigation }) => {
  const { clearLinePaths, takeSnapshots } = useLinePathContext();
  const canvasRef = useCanvasRef();
  const image = require("./zurich.jpg");
  return (
    <>
      <View style={styles.skiaImageContainer}>
        <SkiaImage imageUri={image} canvasRef={canvasRef} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Clear"
          onPress={() => {
            clearLinePaths();
          }}
        />
        <Button
          title="Snapshot"
          onPress={() => {
            takeSnapshots({ canvasRef });
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
  skiaImageContainer: {
    zIndex: 1,
    flex: 75,
  },
  buttonContainer: {
    zIndex: 2,
    flex: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MainScreen;
