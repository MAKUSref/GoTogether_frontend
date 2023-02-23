import { Tab, Text, TabView } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useFetchMyRoomsQuery } from "../../feature/api/apiSlice";
import RoomCard from "./RoomCard";

const Rooms = () => {
  const [index, setIndex] = useState(0);
  const { data: roomsLists = { host: [], user: [], request: [] } } = useFetchMyRoomsQuery();
  console.log(roomsLists)
  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 2,
        }}
        variant="primary"
      >
        <Tab.Item title="Yours rooms" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Joined rooms" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Requested" titleStyle={{ fontSize: 12 }} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "#cca", width: "100%" }}>
        <ScrollView>
          {roomsLists.host.map((r, i)=> <RoomCard key={i} roomId={r.id} host={r.hosts[0]} name={r.name} type="host"/>)}
        </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "#ddd", width: "100%" }}>
          <ScrollView>
            {roomsLists.host.map((r, i)=> <RoomCard key={i} roomId={r.id} host={r.hosts[0]} name={r.name} type="user"/>)}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "#ccc", width: "100%" }}>
          <ScrollView>
            {roomsLists.host.map((r, i)=> <RoomCard key={i} roomId={r.id} host={r.hosts[0]} name={r.name} type="request"/>)}
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default Rooms;
