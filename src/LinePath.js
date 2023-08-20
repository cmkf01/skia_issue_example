import React, {Children, useRef, useState} from 'react';
import {
  Canvas,
  Path,
  Skia,
  SkiaView,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

import {paint} from './Paint';

const {width, height} = Dimensions.get('window');

const LinePath = () => {
  const canvasRef = useRef(null);
  const currentPath = useRef(null);
  const [paths, setPaths] = useState([]);

  const onTouch = useTouchHandler({
    onStart: ({x, y}) => {
      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(x, y);
    },
    onActive: ({x, y}) => {
      currentPath.current?.lineTo(x, y);
      if (canvasRef.current && currentPath.current) {
        canvasRef.current?.drawPath(currentPath.current, paint);
      }
    },
    onEnd: () => {
      setPaths(values =>
        values.concat({
          path: currentPath.current,
          paint: paint,
        }),
      );
      currentPath.current = null;
    },
  });

  const onDraw = useDrawCallback((canvas, info) => {
    onTouch(info.touches);
    canvasRef.current = canvas;
  }, []);

  return (
    <>
      <Canvas style={styles.canvas}>
        {Children.toArray(
          paths.map(
            (value, index) =>
              value.path && (
                <Path key={index} path={value.path} paint={value.paint} />
              ),
          ),
        )}
      </Canvas>
      <SkiaView style={styles.container} onDraw={onDraw} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  canvas: {
    position: 'absolute',
    width: width,
    height: height,
  },
});

export default LinePath;
