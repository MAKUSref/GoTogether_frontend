import { Tab, Text, TabView } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useFetchMyRoomsQuery } from "../../../feature/api/apiSlice";
import RoomCard from "./RoomCard";
import { ROOM_USER_TYPE } from '../types';

const Rooms = () => {
  const [index, setIndex] = useState(0);
  const { data: roomsLists = { host: [], user: [], request: [] } } = useFetchMyRoomsQuery();
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
        <Tab.Item title="Yours rooms" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Joined rooms" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Requested" titleStyle={{ fontSize: 12 }} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
        <ScrollView>
          {roomsLists.host.map((r, i)=> <RoomCard key={i} roomPin={r.pin} host={r.hosts[0]} name={r.name} type={ROOM_USER_TYPE.host} roomId={r.id}/>)}
        </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            {roomsLists.user.map((r, i)=> <RoomCard key={i} roomPin={r.pin} host={r.hosts[0]} name={r.name} type={ROOM_USER_TYPE.user}  roomId={r.id}/>)}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
            {roomsLists.request.map((r, i)=> <RoomCard key={i} roomPin={r.pin} host={r.hosts[0]} name={r.name} type={ROOM_USER_TYPE.request}  roomId={r.id}/>)}
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default Rooms;
