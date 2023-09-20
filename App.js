import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./src/MainScreen";
import SecondaryScreen from "./src/SecondaryScreen";
import { StyleSheet } from "react-native";
import { LinePathProvider } from "./src/LinePathContext";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Secondary"
        component={SecondaryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <LinePathProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </LinePathProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
