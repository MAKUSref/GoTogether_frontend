import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum Routes {
  WelcomePage = "WelcomePage",
  ModeSelect = "ModeSelect",
  Map = "Map",
  Login = "Login",
  Register = "Register",
  RegisterConfirm = "Register Confirm",
  JoinToRoom = "JoinToRoom",
  CreateRoom = "CreateRoom",
};

export type RootStackParamList = {
  [Routes.WelcomePage]: undefined,
  [Routes.ModeSelect]: undefined,
  [Routes.Map]: { roomPin: string },
  [Routes.Login]: undefined,
  [Routes.Register]: undefined,
  [Routes.RegisterConfirm]: { name: string },
  [Routes.JoinToRoom]: undefined,
  [Routes.CreateRoom]: undefined,
};

export type NavigationProps<T extends Routes> = NativeStackScreenProps<RootStackParamList, T>;