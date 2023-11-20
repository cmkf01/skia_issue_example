import React, { useRef } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import SkiaImage from "./SkiaImage";
import { useLinePathContext } from "./LinePathContext";
import { useImage } from "@shopify/react-native-skia";

const MainScreen = ({ navigation }) => {
  const { clearLinePaths, takeSnapshots } = useLinePathContext();
  const canvasRef = useRef();
  const image = require("./zurich.jpg");
  const skImage = useImage(image);
  const { width, height } = Dimensions.get("window");

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
            takeSnapshots(skImage, width, height);
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

export default MainScreen;
