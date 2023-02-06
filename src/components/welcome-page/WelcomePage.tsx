import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import Loader from "../lib/loader/Loader";
import welcomePageStyles from "./styles";

const WelcomePage = ({ navigation }: NavigationProps<Routes.WelcomePage>) => {
  const { welcomePage } = welcomePageStyles;
  const sessionState = useAppSelector((state) => state.session);

  const handleNavigateToNextPage = () => {
    const route = sessionState.userId ? Routes.ModeSelect : Routes.Login;
    navigation.navigate(route);
  };

  useEffect(() => {
    const timeout = 2000;

    setTimeout(() => {
      handleNavigateToNextPage();
    }, timeout);
  }, []);

  return (
    <Pressable style={welcomePage} onPress={handleNavigateToNextPage}>
      <Loader logoVisible={true} />
    </Pressable>
  );
};

export default WelcomePage;
