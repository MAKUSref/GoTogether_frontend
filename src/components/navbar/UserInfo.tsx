import { View, Text, StyleSheet, Image } from "react-native";
// import { Image } from "react-native-elements";

interface UserInfoProps {
  username: string,
  userId: string,
}

const UserInfo = ({username, userId}: UserInfoProps) => {


  return (
  <View style={styles.mainContainer}>
    {/* <Image source={{uri: "https://source.unsplash.com/random?sig=2"}} style={{width: 50, height: 50}}/> */}

    <Image source={{uri: "https://thispersondoesnotexist.com/image"}} style={styles.userAvatar}/>
    <View>
    <Text style={[styles.name, {fontWeight: "600"}]}>{username}</Text>
    <Text style={styles.name}>{userId}</Text>
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
    marginHorizontal: 20
  }
})

export default UserInfo;