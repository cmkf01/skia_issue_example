import React from 'react';
import {Button, StyleSheet} from 'react-native';
import SkiaImage from './SkiaImage';
import {useLinePathContext} from './LinePathContext';
import {ScrollView} from 'react-native-gesture-handler';

const MainScreen = () => {
  const image = require('./zurich.jpg');
  const {clearLinePaths} = useLinePathContext();

  return (
    <ScrollView style={styles.container}>
      <SkiaImage style={styles.skiaImageContainer} imageUri={image} />
      <Button title="Clear" onPress={clearLinePaths} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skiaImageContainer: {
    zIndex: 1,
  },
});

export default MainScreen;
