import React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, Routes } from "./types";
import WelcomePage from "../components/welcome-page/WelcomePage";
import ModeSelect from "../components/mode-select/ModeSelect";
import Map from "../components/map/Map";
import Register from '../components/register/Register';
import Login from '../components/login/Login';
import RegisterConfirm from '../components/register/RegisterConfirm';
import JoinToRoom from '../components/joinToRoom/JoinToRoom';
import { Text } from "react-native-elements";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StatusBarWrapper =
  (Component: any) => ( props: any ) => // for dev purposes only 
    (
      <>
        <Component {...props} />
        <StatusBar />
      </>
    );

const RouteApp = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.WelcomePage}
      component={WelcomePage}
      options={{
        title: "",
        headerShadowVisible: false,
      }}
    />
    <Stack.Screen
      name={Routes.ModeSelect}
      component={ModeSelect}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={Routes.Map}
      component={Map}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name={Routes.Login}
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name={Routes.Register}
      component={Register}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name={Routes.RegisterConfirm}
      component={RegisterConfirm}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name={Routes.JoinToRoom}
      component={JoinToRoom}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RouteApp;
