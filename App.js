import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./src/MainScreen";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <MainScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
