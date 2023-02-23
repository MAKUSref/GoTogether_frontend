import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Icon, Button} from '@rneui/themed';
import { ROOM_USER_TYPE } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../routing/types";

interface RoomButtonProps {
  name: string,
  host: string,
  roomPin: number,
  type: string
}

const RoomCard = ({name, host, type, roomPin}: RoomButtonProps) => {
  const navigation = useNavigation<any>();

  const handleJoinRoom = () => {
    navigation.navigate(Routes.Map, { roomPin });
  }

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={type == ROOM_USER_TYPE.request ? styles.cardBlocked : {}} >
        <Pressable style={styles.row} onPress={handleJoinRoom}>
          <View style={styles.row}>
            {
              type === ROOM_USER_TYPE.host &&  <Icon type="material-community" name="crown" iconStyle={styles.crownIcon}/>
            }
            {
              type === ROOM_USER_TYPE.user &&  <Icon type="ant-design" name="user" iconStyle={styles.userIcon}/>
            }
            {
              type === ROOM_USER_TYPE.request &&  <Icon type="material-community" name="block-helper" iconStyle={styles.userIcon}/>
            }
           <Text>{name}</Text>            
          </View>
          <View>
            {type == 'request' ? <Button title='Cancel' /> : <Button title='Leave' />}
          </View>
        </Pressable>
      </Card>

    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  cardBlocked: {
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  crownIcon: {
    color: "#D8C200",
    marginRight: 5,
  },
  userIcon: {
    color: "#000",
    marginRight: 5,
  },
});
export default RoomCard;