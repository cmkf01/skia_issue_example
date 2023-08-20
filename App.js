import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainScreen from './src/MainScreen';
import LinePathScreen from './src/LinePathScreen';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator name="Stack">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="LinePath" component={LinePathScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
