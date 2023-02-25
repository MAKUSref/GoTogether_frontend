import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Icon, Button } from "@rneui/themed";
import { ROOM_USER_TYPE } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../routing/types";
import {
  useAcceptUserMutation,
  useDeleteHostMutation,
  useDeleteRequestedMutation,
  useDeleteUserMutation,
  useFetchUserQuery,
  useFetchUsersInfoFromRoomQuery,
  useGrantHostMutation,
  useLeaveRoomMutation,
} from "../../../feature/api/apiSlice";
import { useAppSelector } from "../../../feature/hooks";
import { IUser } from "../../../feature/api/types";

interface UserCardProps {
  userId: string;
  type: ROOM_USER_TYPE;
  isButtonVisable: boolean;
  roomId: string;
}

const UserCard = ({ userId, type, isButtonVisable, roomId }: UserCardProps) => {
  const navigation = useNavigation<any>();

  const sessionState = useAppSelector((state) => state.session);
  const [acceptRequest] = useAcceptUserMutation();
  const [grantHost] = useGrantHostMutation();

  const [leaveRoom] = useLeaveRoomMutation();
  const [deleteHost] = useDeleteHostMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteRequested] = useDeleteRequestedMutation();
  

  const { data: user } = useFetchUserQuery({ userId });
  // console.log(user?.user[0])

  const handleAcceptRequest = () => {
    acceptRequest({ roomId, userId }).catch(console.error);
  };

  const handleGrantHost = () => {
    grantHost({ roomId, userId }).catch(console.error);
  };

  const handleDeleteHost = () => {
    deleteHost({ roomId, userId }).catch(console.error);
  };
  const handleDeleteUser = () => {
    deleteUser({ roomId, userId }).catch(console.error);
  };
  const handleDeleteRequested = () => {
    deleteRequested({ roomId, userId }).catch(console.error);
  };

  const handleLeave = () =>{
    leaveRoom({roomId});
    navigation.navigate(Routes.ModeSelect);
    
  }

  const getLastTime = (user: IUser | undefined) =>{
    
    if( !user || !user.coords) return "";
    const minutes = Math.round((Date.now() - user.coords.timestamp) / 60000);
    if(minutes >= 1)
    return `  ${minutes}m ago` 

  }

  const getButton = () => {

    if (userId == sessionState.userId) {
      return <Button title={"Leave"} onPress={handleLeave} />;
    }

    if (isButtonVisable) {
      switch (type) {
        case ROOM_USER_TYPE.host:
          return <Button title={"Kick"} onPress={handleDeleteHost} />;
        case ROOM_USER_TYPE.user:
          return (
            <>
              <Button title={"Promote"} onPress={handleGrantHost} />
              <Button
                title={"Kick"}
                onPress={handleDeleteUser}
                containerStyle={{ marginLeft: 10 }}
              />
            </>
          );
        case ROOM_USER_TYPE.request:
          return (
            <>
              <Button title={"Accept"} onPress={handleAcceptRequest} />

              <Button
                title={"Reject"}
                onPress={handleDeleteRequested}
                containerStyle={{ marginLeft: 10 }}
              />
            </>
          );
      }
    }

    return <></>;
  };

  return (
    <View style={styles.mainContainer}>
      <Card
        containerStyle={
          type == ROOM_USER_TYPE.request ? styles.cardBlocked : {}
        }
      >
        <Pressable style={styles.row}>
          <View style={styles.row}>
            {type === ROOM_USER_TYPE.host && (
              <Icon
                type="material-community"
                name="crown"
                iconStyle={styles.crownIcon}
              />
            )}
            {type === ROOM_USER_TYPE.user && (
              <Icon type="ant-design" name="user" iconStyle={styles.userIcon} />
            )}
            {type === ROOM_USER_TYPE.request && (
              <Icon
                type="material-community"
                name="block-helper"
                iconStyle={styles.userIcon}
              />
            )}
            <Text>{user?.user[0]?.name}</Text>
            <Text style={{color: '#aaa', fontSize: 10}}>{getLastTime(user?.user[0])}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {isButtonVisable && getButton()}
          </View>
        </Pressable>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  cardBlocked: {
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
export default UserCard;
