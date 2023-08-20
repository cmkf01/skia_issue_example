import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import SkiaImage from './SkiaImage';
import LinePath from './LinePath';

const MainScreen = ({navigation}) => {
  const image = require('./zurich.jpg');
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleDrawingMode = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Go to LinePath"
        onPress={() => navigation.navigate('LinePath')}
      />
      <Button
        title="Toggle LinePath Overlay"
        onPress={toggleDrawingMode}
        color={isDrawing ? 'green' : 'red'}
      />
      {isDrawing && (
        <Animated.View style={styles.linePathContainer}>
          <LinePath />
        </Animated.View>
      )}
      <Animated.View style={styles.skiaImageContainer}>
        <SkiaImage imageUri={image} canManipulate={true} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  linePathContainer: {
    zIndex: 2,
  },
  skiaImageContainer: {
    zIndex: 1,
  },
});

export default MainScreen;
