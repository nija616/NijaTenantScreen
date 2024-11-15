import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/Screen/LoginScreen";
import SignUpScreen from "./src/Screen/SignUpScreen";
import ResetPassword from "./src/Screen/ResetPassword";
import OTPVerification from "./src/Screen/OTPVerification";
import NewPassword from "./src/Screen/NewPassword";
import HomeScreen from "./src/Screen/TenantHomeScreen/HomeScreen";
import PropertyDetailScreen from "./src/Screen/PropertyScreen/PropertyDetailScreen";
import SearchScreen from "./src/Screen/SearchScreen/SearchScreen";
import ResultsScreen from "./src/Screen/SearchScreen/ResultsScreen";
import FavoriteScreen from "./src/Screen/FavoriteScreen/FavoriteScreen";
import ProfileScreen from "./src/Screen/ProfileScreen/ProfileScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TenantHome"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetail"
          component={PropertyDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
