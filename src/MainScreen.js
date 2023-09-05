import React from "react";
import { Button, StyleSheet, View } from "react-native";
import SkiaImage from "./SkiaImage";
import { useLinePathContext } from "./LinePathContext";
import { SkiaView } from "@shopify/react-native-skia";

const MainScreen = () => {
  const image = require("./zurich.jpg");
  const { clearLinePaths, popLinePath } = useLinePathContext();

  return (
    <>
      <SkiaView style={styles.container}>
        <SkiaImage style={styles.skiaImageContainer} imageUri={image} />
      </SkiaView>
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={clearLinePaths} />
        <Button title="Undo" onPress={popLinePath} />
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
