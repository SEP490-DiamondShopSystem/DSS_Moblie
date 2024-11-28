// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import OrderScreen from "../screens/OrderScreen/OrderScreen";

// Import screen components

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    {/* <Stack.Screen
      name="Welcome"
      options={{
        headerShown: false,
      }}
      component={WelcomeScreen}
    /> */}
    <Stack.Screen
      name="Login"
      options={{
        headerShown: false,
      }}
      component={LoginScreen}
    />
    {/* <Stack.Screen
      name="OrderScreen"
      options={{
        headerShown: false,
      }}
      component={OrderScreen}
    /> */}
    <Stack.Screen
      name="BottomTabNavigator"
      options={{
        headerShown: false,
      }}
      component={BottomTabNavigator}
    />
    {/* <Stack.Screen
      name="BottomTabs"
      options={{
        headerShown: false,
        swipeEnabled: false,
      }}
      component={BottomTabNavigator}
    />
    <Stack.Screen
      name="BottomTabYardOwnerNavigator"
      options={{
        headerShown: false,
      }}
      component={BottomTabYardOwnerNavigator}
    /> */}

    {/* <Stack.Screen
      name="BlogDetailScreen"
      component={BlogDetailScreen}
      options={{
        title: "Bài viết",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    /> */}
  </Stack.Navigator>
);

export default StackNavigator;
