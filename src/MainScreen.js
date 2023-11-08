import React, { useCallback, useReducer } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { Skia, rect, useCanvasRef, useImage } from "@shopify/react-native-skia";
import { useSharedValue } from "react-native-reanimated";
import GestureHandler from "./GestureHandler";
import { Canvas, Path, Group, Image } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const LinePathReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { ...state, linePaths: [...state.linePaths, action.payload] };
    case "clear":
      return { ...state, linePaths: [], snapshots: [] };
    case "add-snapshots":
      return { ...state, snapshots: [...action.payload] };
    default:
      return state;
  }
};

const MainScreen = () => {
  const initialState = { linePaths: [], snapshots: [] };
  const [state, dispatch] = useReducer(LinePathReducer, initialState);

  const addLinePath = useCallback(
    linePath => {
      dispatch({ type: "add", payload: linePath });
    },
    [dispatch],
  );

  const clearLinePaths = useCallback(() => {
    dispatch({ type: "clear" });
  }, [dispatch]);

  const getSnapshots = ({ canvasRef }) => {
    try {
      if (state.linePaths.length > 0) {
        const bounds = state.linePaths.map(linePath =>
          linePath.path.getBounds(),
        );
        const snapshots = bounds
          .map(bound => {
            const snapshot = canvasRef.current?.makeImageSnapshot(bound);
            return snapshot;
          })
          .filter(Boolean);
        console.log("number of snapshots taken= ", snapshots.length);
        dispatch({ type: "add-snapshots", payload: snapshots });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const image = require("./zurich.jpg");
  const skImage = useImage(image);
  const canvasRef = useCanvasRef();
  const pictureMatrix = useSharedValue(Skia.Matrix());
  const pictureDimensions = rect(0, 0, width, height);
  return (
    <>
      <View style={styles.skiaImageContainer}>
        <Canvas
          ref={canvasRef}
          style={{
            width,
            height,
          }}>
          <Group matrix={pictureMatrix}>
            <Image
              x={0}
              y={0}
              width={width}
              height={height}
              image={skImage}
              fit="contain"
            />
            {state.linePaths.map((linePath, index) => (
              <Path
                key={`${index}-path`}
                path={linePath.path}
                paint={linePath.paint}
              />
            ))}
          </Group>
        </Canvas>
        <GestureHandler
          matrix={pictureMatrix}
          dimensions={pictureDimensions}
          debug={false}
          addLinePath={addLinePath}
        />
      </View>
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
            try {
              getSnapshots({ canvasRef });
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  skiaImageContainer: {
    zIndex: 1,
    flex: 92,
  },
  buttonContainer: {
    zIndex: 2,
    flex: 8,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MainScreen;
