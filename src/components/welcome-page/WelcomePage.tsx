import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { useGetStatusQuery } from "../../feature/api/apiSlice";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import Loader from "../lib/loader/Loader";
import welcomePageStyles from "./styles";

const REQUESTS_TIMEOUT = 100;

const WelcomePage = ({ navigation }: NavigationProps<Routes.WelcomePage>) => {
  const { welcomePage } = welcomePageStyles;

  const [requestsIterator, setRequestsIterator] = useState(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>();
  const sessionState = useAppSelector((state) => state.session);
  const { data: serverStatus } = useGetStatusQuery(requestsIterator);

  const handleNavigateToNextPage = () => {
    const route = sessionState.userId ? Routes.ModeSelect : Routes.Login;
    navigation.navigate(route);
  };

  useEffect(() => {
    if (serverStatus?.status === "OK") {
      clearInterval(intervalId);
      handleNavigateToNextPage();
    }
  }, [serverStatus]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRequestsIterator((prev) => prev + 1);
    }, REQUESTS_TIMEOUT);

    setIntervalId(intervalId);
  }, []);

  return (
    <Pressable style={welcomePage} onPress={handleNavigateToNextPage}>
      <Loader logoVisible={true} />
    </Pressable>
  );
};

export default WelcomePage;
