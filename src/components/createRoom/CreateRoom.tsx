import React, { PropsWithChildren, RefObject, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button, Header, Text} from "react-native-elements";
import {Card, Input, InputProps} from "@rneui/themed";
import { useGetStatusQuery, useCreateRoomMutation, useJoinToRoomMutation } from "../../feature/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../feature/hooks";
import { logout } from "../../feature/session/sessionSlice";
import { NavigationProps, Routes } from "../../routing/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateRoom = ({ navigation }: NavigationProps<Routes.CreateRoom>) => {

    const [roomName, setRoomName] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [createRoom] = useCreateRoomMutation();
  
    const sessionState = useAppSelector((state) => state.session);
  
    const handleReturnToModeSelect = () => {
        navigation.navigate(Routes.ModeSelect);
      };

    const handleCreateRoom = () => {
        if(roomName && roomName.length > 6){
        console.log(`Creating new room...`);
        createRoom({name: roomName})
        .unwrap()
        .then(()=>{
            console.log(`Room ${roomName} created`);
            // navigation.navigate(Routes.ModeSelect);
            setErrorMessage("Room created succesfully")

          }).catch((e)=>{
            console.error(`Room not created due to error: ${e}`);
            setErrorMessage("Room not created")
        });
        }else{
          setErrorMessage("Rooms name must be at least 6 characters long!")
        }
    }

    return (
        <View style={styles.container}>
          <View style={styles.col}>
            {sessionState.userId ? (
              <>
                <Card>
                  <Card.Title>Create new room</Card.Title>
                  <Card.Divider />
                  <Input
                  leftIcon={<Icon name="map" size={20} />}
                  onChangeText={setRoomName}
                  placeholder="Room's name"
                  />
                  <Button title="Create own room" onPress={handleCreateRoom} />
                </Card>
                <Button title="Go back" onPress={handleReturnToModeSelect} containerStyle={styles.goBackButton} />
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                {/* <Text>UserId: {sessionState.userId}</Text>
                <Text>UserType: {sessionState.userType}</Text> */}
              </>
            ) : (
              <>
                <Text style={[styles.textCenter, {marginBottom: 60}]}>Here will be image</Text>
                <Text h4 style={[styles.textCenter, {marginBottom: 20}]}>You have to login first</Text>
                <Button title="Go back" onPress={handleReturnToModeSelect} />
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
    },
    goBackButton: {
      marginVertical: 20
    },
    errorMessage: {
      textAlign: "center",
      color: "#aaa"
    }
  });

export default CreateRoom;
