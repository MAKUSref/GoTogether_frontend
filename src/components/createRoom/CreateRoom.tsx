import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { Card, Input } from "@rneui/themed";
import { useCreateRoomMutation } from "../../feature/api/apiSlice";
import { NavigationProps, Routes } from "../../routing/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateRoom = ({ navigation }: NavigationProps<Routes.CreateRoom>) => {
  const [roomName, setRoomName] = useState<string>();
  const [createRoom] = useCreateRoomMutation();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleReturnToModeSelect = () => {
      navigation.navigate(Routes.ModeSelect);
    };

  const handleCreateRoom = () => {
    if(roomName && roomName.length >= 6){
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
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <View style={{ width: "100%", height: "40%", marginVertical: 70 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: "https://i.ibb.co/HddbJ8p/undraw-Welcome-re-h3d9.png",
            }}
          />
        </View>
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
  errorMessage: {
    textAlign: "center",
    color: "#aaa"
  }
});

export default CreateRoom;
