import React, { PropsWithChildren, RefObject, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button, Header, Text} from "react-native-elements";
import {Card, Input, InputProps} from "@rneui/themed";
import { useGetStatusQuery, useCreateRoomMutation, useJoinToRoomMutation } from "../../feature/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../feature/hooks";
import { logout } from "../../feature/session/sessionSlice";
import { NavigationProps, Routes } from "../../routing/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ModeSelect = ({ navigation }: NavigationProps<Routes.ModeSelect>) => {

  const [roomPin, setRoomPin] = useState<string>();
  const [roomName, setRoomName] = useState<string>();
  const [createRoom] = useCreateRoomMutation();
  const [joinToRoom] = useJoinToRoomMutation();

  const sessionState = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();
  // const { data: statusData } = useGetStatusQuery();

  const handleOpenLoginPage = () => {
    navigation.navigate(Routes.Login);
  };

  const handleLogut = () => {
    dispatch(logout());
  };

  const handleCreateRoom = () => {
    navigation.navigate(Routes.CreateRoom);
  }
  const handleJoinToRoom = () => {
    navigation.navigate(Routes.JoinToRoom);
  }

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        {sessionState.userId ? (
          <>
            <Card>
              {/* <Card.Title>Join room</Card.Title>
              <Card.Divider />
              <Input
              leftIcon={<Icon name="link" size={20} />}
              placeholder="Enter Code"
              onChangeText={setRoomPin}
              keyboardType="decimal-pad"
              /> */}
              <Button title="Join to room" onPress={handleJoinToRoom}/>
            </Card>
            <Card>
              {/* <Card.Title>Create new room</Card.Title>
              <Card.Divider />
              <Input
              leftIcon={<Icon name="map" size={20} />}
              onChangeText={setRoomName}
              placeholder="Room's name"
              /> */}
              <Button title="Create own room" onPress={handleCreateRoom} />
            </Card>
            <Button title="Logout" onPress={handleLogut} containerStyle={styles.button}/>
            {/* <Text>UserId: {sessionState.userId}</Text>
            <Text>UserType: {sessionState.userType}</Text> */}
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
  },
  button: {
    marginTop: 20,
  },
  panel: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row"
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
  }
});

export default ModeSelect;
