import React, { useState } from "react";
import { Button, Overlay, Icon, SpeedDial } from "@rneui/themed";
import { View, Text, StyleSheet, Animated } from "react-native";
import * as Speech from "expo-speech";
import { IUser } from "../../feature/api/types";
import RNShake from 'react-native-shake';

interface SpeechButtonProps {
  others: IUser[];
  you: {
    lat: number;
    long: number;
  };
}

const SpeechButton = (users: SpeechButtonProps) => {


  const [open, setOpen] = React.useState(false);

  RNShake.addListener( () => {
    console.log("chaka laka shake shake shake")
  });

  const getUserCoords = (user: IUser, lon: number, lat: number) => {
    if(!user.coords) return 'Cannot calculate';
    return `User ${user.name} is ${calculateDist(user.coords?.long, user.coords?.lat, lat, lon)} meters away in ${calculateDirection(lat, lon, user.coords?.long, user.coords?.lat)}`;
  };

  const calculateDist = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.round(Math.acos(Math.sin(y1)*Math.sin(y2)+Math.cos(y1)*Math.cos(y2)*Math.cos(x2-x1))*63710);
  }

  const calculateDirection = (x1: number, y1: number, x2: number, y2: number) => {


    const angle =  ((Math.round( Math.atan2( y2 - y1, x2 - x1 ) * ( 180 / Math.PI ))) - 67.5) % 180;


    if(angle > 0 && angle < 45){
      return "north"
    }else if(angle >= 45 && angle < 90){
      return "north-west"
    }else if(angle >= 90 && angle < 135){
      return "west"
    }else if(angle >= 135 && angle < 180){
      return "south-west"
    }else if(angle >= -180 && angle < -135){
      return "south"
    }else if(angle >= -135 && angle < -90){
      return "south-east"
    }else if(angle >= -90 && angle < -45){
      return "east"
    }else if(angle >= -45 && angle < 0){
      return "north-east"
    }else {
      return "uknown direction"
    }


  }

  const handleOpen = () => {
    setOpen(true);
    let toTell = ""; 
    if (!users.others) return;
    users.others.forEach((user) => {
      if (user.coords) {
        toTell+=getUserCoords(user, users.you.lat, users.you.long);
      }
    });
    Speech.speak(toTell, {
      rate: .8,
      language: "en-US",
      onDone: () => {
        setOpen(false);
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    Speech.stop();
  };

  return (
    <View style={{width: 87}}>

    <SpeedDial
          isOpen={open}
          icon={{ name: "sound", type: "ant-design", color: "#fff" }}
          openIcon={{ name: "close", color: "#fff" }}
          onOpen={handleOpen}
          onClose={handleClose}
          containerStyle={styles.speedDialButton}
        >
      
    </SpeedDial>
    </View>

  );
};

const styles = StyleSheet.create({
  speedDialButton: {
    bottom: 100,
  },
});

export default SpeechButton;
