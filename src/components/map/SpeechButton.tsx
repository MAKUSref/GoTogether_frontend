import React, { useState } from "react";
import { Button, Overlay, Icon, SpeedDial } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

const SpeechButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    Speech.speak("Your friends are here and waiting for you!", {
      rate: 0.8,
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
    <SpeedDial
      isOpen={open}
      icon={{ name: "sound", type: "ant-design", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={handleOpen}
      onClose={handleClose}
      containerStyle={styles.speedDialButton}
    ></SpeedDial>
  );
};

const styles = StyleSheet.create({
  speedDialButton: {
    bottom: 100,
  },
});

export default SpeechButton;
