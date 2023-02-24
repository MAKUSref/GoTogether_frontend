import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, SpeedDial, Text } from "react-native-elements";
import { Card } from "@rneui/themed";
import {
  useCreateRoomMutation,
  useJoinToRoomMutation,
} from "../../feature/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../feature/hooks";
import { logout } from "../../feature/session/sessionSlice";
import { NavigationProps, Routes } from "../../routing/types";
import Navbar from "../navbars/Navbar";
import Rooms from "../navbars/navbar/RoomList";
import UserInfo from "../navbars/navbar/UserInfo";
import RoomList from "../navbars/navbar/RoomList";
import SpeechButton from "../map/SpeechButton";

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
        {sessionState.userId ? (
          <>
            <Card>
              <Button title="Join to room" onPress={handleJoinToRoom} />
            </Card>
            <Card>
              <Button title="Create own room" onPress={handleCreateRoom} />
            </Card>
          </>
        ) : (
          <>
            <Text style={[styles.textCenter, { marginBottom: 60 }]}>
              Here will be image
            </Text>
            <Text h4 style={[styles.textCenter, { marginBottom: 20 }]}>
              You have to login first
            </Text>
            <Button title="Go to Login" onPress={handleOpenLoginPage} />
          </>
        )}
      </View>


      {sessionState.userId && (
        <Navbar
          bottomSection={<RoomList />}
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
