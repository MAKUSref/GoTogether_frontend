import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Icon, Button} from '@rneui/themed';
import { ROOM_USER_TYPE } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../routing/types";
import { useDeleteRequestedMutation, useLeaveRoomMutation } from "../../../feature/api/apiSlice";
import { useAppSelector } from "../../../feature/hooks";

interface RoomButtonProps {
  name: string,
  host: string,
  roomPin: number,
  type: string,
  roomId: string,
}

const RoomCard = ({name, host, type, roomPin, roomId}: RoomButtonProps) => {
  const navigation = useNavigation<any>();

  const handleJoinRoom = () => {
    navigation.navigate(Routes.Map, { roomPin });
  }
  const sessionState = useAppSelector((state) => state.session);

  const [leave] = useLeaveRoomMutation();

  const handleLeave = () => {
    if(sessionState.userId){

      leave({ roomId }).then(console.log).catch(console.error)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={type == ROOM_USER_TYPE.request ? styles.cardBlocked : {}} >
        <Pressable style={styles.row} onPress={handleJoinRoom}>
          <View style={styles.row}>
            {
              type === ROOM_USER_TYPE.host && <Icon type="material-community" name="crown" iconStyle={styles.crownIcon}/>
            }
            {
              type === ROOM_USER_TYPE.user && <Icon type="ant-design" name="user" iconStyle={styles.userIcon}/>
            }
            {
              type === ROOM_USER_TYPE.request && <Icon type="material-community" name="block-helper" iconStyle={styles.userIcon}/>
            }
           <Text>{name}</Text>            
          </View>
          <View>


            <Button title={type === ROOM_USER_TYPE.request ? 'Cancel' : 'Leave'} onPress={handleLeave}/>
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