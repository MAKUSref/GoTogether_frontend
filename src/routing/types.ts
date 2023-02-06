import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum Routes {
  WelcomePage = "WelcomePage",
  ModeSelect = "ModeSelect",
  Map = "Map",
  Login = "Login",
  Register = "Register",
  RegisterConfirm = "Register Confirm"
};

export type RootStackParamList = {
  [Routes.WelcomePage]: undefined,
  [Routes.ModeSelect]: undefined,
  [Routes.Map]: undefined,
  [Routes.Login]: undefined,
  [Routes.Register]: undefined,
  [Routes.RegisterConfirm]: { name: string },
};

export type NavigationProps<T extends Routes> = NativeStackScreenProps<RootStackParamList, T>;