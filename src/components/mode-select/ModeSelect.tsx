import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { Card } from "@rneui/themed";
import {
  useCreateRoomMutation,
  useJoinToRoomMutation,
} from "../../feature/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../feature/hooks";
import { logout } from "../../feature/session/sessionSlice";
import { NavigationProps, Routes } from "../../routing/types";
import Navbar from "../navbars/Navbar";
import Rooms from "../navbars/navbar/Rooms";
import UserInfo from "../navbars/navbar/UserInfo";

const ModeSelect = ({ navigation }: NavigationProps<Routes.ModeSelect>) => {
  const sessionState = useAppSelector((state) => state.session);

  const handleOpenLoginPage = () => {
    navigation.navigate(Routes.Login);
  };

  const handleCreateRoom = () => {
    navigation.navigate(Routes.CreateRoom);
  };
  const handleJoinToRoom = () => {
    navigation.navigate(Routes.JoinToRoom);
  };

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <View style={{width: '100%', height: '50%', marginVertical: 50}}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri:'https://i.ibb.co/cJkNtk5/Journey-amico.png'}}
          />
        </View>
        {sessionState.userId ? (
          <>
            <Card>
              <Button title="Join to new room" onPress={handleJoinToRoom} />
            </Card>
            <Card>
              <Button title="Create own room" onPress={handleCreateRoom} />
            </Card>
          </>
        ) : (
          <>
            <Text h4 style={[styles.textCenter, { marginBottom: 20 }]}>
              You have to login first
            </Text>
            <Button title="Go to Login" onPress={handleOpenLoginPage} />
          </>
        )}
      </View>
      {sessionState.userId && (
        <Navbar
          bottomSection={<Rooms />}
          topSection={
            <UserInfo
              userId={sessionState.userId}
              username={sessionState.username || ""}
            />
          }
        />
      )}
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
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
  panel: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
  },
  panelSide: {
    flex: 1,
    height: 200,
  },
  panelSide1: {
    backgroundColor: "#54972b",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  panelSide2: {
    backgroundColor: "#972b54",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default ModeSelect;
