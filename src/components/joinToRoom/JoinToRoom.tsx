import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Image} from "react-native-elements";
import {Card, Input} from "@rneui/themed";
import {  useJoinToRoomMutation } from "../../feature/api/apiSlice";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const JoinToRoom = ({ navigation }: NavigationProps<Routes.JoinToRoom>) => {

  const [roomPin, setRoomPin] = useState<string>();
  const [joinToRoom] = useJoinToRoomMutation();

  const sessionState = useAppSelector((state) => state.session);

  const handleJoinRoom = () => {
    if(roomPin && roomPin.length === 5){
      console.log(`Joining to room...`);
      joinToRoom({pin: roomPin, userId: sessionState.userId || ""})
        .unwrap()
        .then(()=>{
          console.log(`Joined to room ${roomPin}`);
          navigation.navigate(Routes.Map, { roomPin });
        }).catch((e)=>{
          console.error(`Cannot join due to error: ${e}`);
        });
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Card>
          <Card.Title>Join room</Card.Title>
          <Card.Divider />
          <Input
          leftIcon={<Icon name="link" size={20} />}
          placeholder="Enter Code"
          onChangeText={setRoomPin}
          keyboardType="decimal-pad"
          />
          <Button title="Join to room" onPress={handleJoinRoom}/>
        </Card>
        <View style={{ width: "100%", height: "35%", marginVertical: 70 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: "https://i.ibb.co/s1qhspx/undraw-Login-re-4vu2.png",
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

export default JoinToRoom;
