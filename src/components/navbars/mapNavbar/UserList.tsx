import { Tab, Text, TabView } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import UserCard from "./UserCard";
import { ROOM_USER_TYPE } from '../types';
import { useAppSelector } from "../../../feature/hooks";

interface UserListProps {
  hosts: string[],
  users: string[],
  requestedUsers: string[],
  roomId: string
}


const UserList = ({hosts, users, requestedUsers, roomId}: UserListProps) => {
  const [index, setIndex] = useState(0);
  const sessionState = useAppSelector((state) => state.session);

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          // height: 2,
        }}
        variant="primary"
      >
        <Tab.Item title="Hosts" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Users" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Requested" titleStyle={{ fontSize: 12 }} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
        <ScrollView>
          {hosts.map((r, i)=> <UserCard userId={r} type={ROOM_USER_TYPE.host} isButtonVisable={hosts.includes(sessionState.userId || '')} key={i} roomId={roomId} />)}
        </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            {users.map((r, i)=>  <UserCard userId={r} type={ROOM_USER_TYPE.user}  isButtonVisable={hosts.includes(sessionState.userId || '')} key={i} roomId={roomId}/>)}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            {requestedUsers.map((r, i)=>  <UserCard userId={r} type={ROOM_USER_TYPE.request}  isButtonVisable={hosts.includes(sessionState.userId || '')} key={i} roomId={roomId}/>)}
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default UserList;
