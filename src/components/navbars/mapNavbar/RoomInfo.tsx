import { View, Text, StyleSheet, Image } from "react-native";
// import { Image } from "react-native-elements";
import { Icon } from '@rneui/themed';
import { logout } from "../../../feature/session/sessionSlice";
import { useAppDispatch, useAppSelector } from "../../../feature/hooks";
import { NavigationProps, Routes } from "../../../routing/types";
import { useNavigation } from "@react-navigation/native";

interface RoomInfoProps {
  roomName: string,
  roomId: string,
  pin: number
}

const RoomInfo = ({roomName, roomId, pin}: RoomInfoProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();



  const handleLogut = () => {
    dispatch(logout());
    navigation.navigate(Routes.Login);
  };


  return (
  <View style={styles.mainContainer}>
    {/* <Image source={{uri: "https://source.unsplash.com/random?sig=2"}} style={{width: 50, height: 50}}/> */}

    {/* <Image source={{uri: "https://thispersondoesnotexist.com/image"}} style={styles.userAvatar}/> */}
    <View>
      <View style={styles.nameRow} >
        <Text style={[styles.name, {fontWeight: "600"}]}>{roomName}</Text>
        <Icon name='exit-to-app' onPress={handleLogut} />
      </View>
      <View style={styles.nameRow} >
        <Text style={styles.name}>{pin}</Text>
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    // backgroundColor: "red",
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  name: {
    backfaceVisibility: "visible",
  },
  nameRow: {
    marginHorizontal: 20,
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

export default RoomInfo;