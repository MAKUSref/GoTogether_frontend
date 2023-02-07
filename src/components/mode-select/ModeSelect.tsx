import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Header, Text } from "react-native-elements";
import { useGetStatusQuery } from "../../feature/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../feature/hooks";
import { logout } from "../../feature/session/sessionSlice";
import { NavigationProps, Routes } from "../../routing/types";

const ModeSelect = ({ navigation }: NavigationProps<Routes.ModeSelect>) => {
  const sessionState = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();
  // const { data: statusData } = useGetStatusQuery();

  const handleOpenLoginPage = () => {
    navigation.navigate(Routes.Login);
  };

  const handleLogut = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        {sessionState.userId ? (
          <>
            <Button title="Logout" onPress={handleLogut} />
            <Text>UserId: {sessionState.userId}</Text>
            <Text>UserType: {sessionState.userType}</Text>
          </>
        ) : (
          <>
            <Text style={[styles.textCenter, {marginBottom: 60}]}>Here will be image</Text>
            <Text h4 style={[styles.textCenter, {marginBottom: 20}]}>You have to login first</Text>
            <Button title="Go to Login" onPress={handleOpenLoginPage} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  col: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 40,
  },
  textCenter: {
    textAlign: 'center'
  }
});

export default ModeSelect;
