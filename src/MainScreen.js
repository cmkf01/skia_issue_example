import React, { useState } from "react";
import { Button, View } from "react-native";
import {
  Canvas,
  Path,
  Group,
  Image,
  Skia,
  useCanvasRef,
  useImage,
  rect,
} from "@shopify/react-native-skia";
import { useSharedValue } from "react-native-reanimated";
import GestureHandler from "./GestureHandler";

const width = 300;
const height = 500;

const MainScreen = () => {
  const [linePaths, setLinePaths] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const canvasRef = useCanvasRef();
  const pictureMatrix = useSharedValue(Skia.Matrix());
  const pictureDimensions = rect(0, 0, width, height);
  const skImage = useImage(require("./zurich.jpg"));

  const addLinePath = linePath => {
    setLinePaths(currentPaths => [...currentPaths, linePath]);
  };

  const clearLinePaths = () => {
    setLinePaths([]);
    setSnapshots([]);
  };

  const getSnapshots = () => {
    console.log("linePaths.length= ", linePaths.length);
    if (linePaths.length > 0) {
      const newSnapshots = linePaths
        .map(linePath => {
          const bound = linePath.path.getBounds();
          return canvasRef.current?.makeImageSnapshot(bound);
        })
        .filter(Boolean);
      setSnapshots(newSnapshots);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas ref={canvasRef} style={{ width, height }}>
        <Group matrix={pictureMatrix}>
          <Image
            x={0}
            y={0}
            width={width}
            height={height}
            image={skImage}
            fit="contain"
          />
          {linePaths.map((linePath, index) => (
            <Path key={index} {...linePath} />
          ))}
        </Group>
      </Canvas>
      <GestureHandler
        matrix={pictureMatrix}
        dimensions={pictureDimensions}
        debug={false}
        addLinePath={addLinePath}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button title="Clear" onPress={clearLinePaths} />
        <Button title="Snapshot" onPress={getSnapshots} />
      </View>
    </View>
  );
};

export default MainScreen;
