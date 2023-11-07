import React from "react";
import { Dimensions, View, Text, Button } from "react-native";
import { useLinePathContext } from "./LinePathContext";
import { Canvas, Image } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");
const scrollViewHeight = height * 0.2;

const SecondaryScreen = ({ navigation }) => {
  const { snapshots } = useLinePathContext();

  if (snapshots.length === 0) {
    return (
      <View>
        <Text>Nothing to show</Text>
        <Button title="Return" onPress={() => navigation.navigate("Main")} />
      </View>
    );
  }

  return (
    <View>
      <Button title="Return" onPress={() => navigation.navigate("Main")} />
      {snapshots.map((snapshot, index) => (
        <Canvas key={index} height={scrollViewHeight}>
          <Image
            image={snapshot}
            x={0}
            y={0}
            width={width}
            height={scrollViewHeight}
            fit="contain"
          />
        </Canvas>
      ))}
    </View>
  );
};

export default SecondaryScreen;
