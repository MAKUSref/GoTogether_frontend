import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import Loader from "../lib/loader/Loader";
import { useFetchRoomByPinQuery, useJoinToRoomMutation } from "../../feature/api/apiSlice";
import { Room } from "../../feature/api/types";
import { Button } from "react-native-elements";
import Navbar from "../navbars/Navbar";
import RoomInfo from "../navbars/mapNavbar/RoomInfo";
import UserList from "../navbars/mapNavbar/UserList";

const CHECK_USER_STATUS_TIMEOUT = 2000;

const LOADER_MSG_LOADING = "Loading...";
const LOADER_MSG_WAIT_FOR_ACCEPT = "Waiting for accept your request...";
const LOADER_MSG_NO_IN_ROOM = "You are no longer in this room. Leave it or send request again.";

const Map = ({ navigation, route }: NavigationProps<Routes.Map>) => {
  const { roomPin } = route.params;

  const [acceptionIntervalId, setAcceptionIntervalId] = useState<NodeJS.Timer | undefined>();
  const [iterator, setIterator] = useState<number>(0);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loaderMsg, setLoaderMsg] = useState<string>(LOADER_MSG_LOADING);

  const sessionsState = useAppSelector((state) => state.session);

  const { data: roomsRes } = useFetchRoomByPinQuery({ roomPin, i: iterator });
  const [joinToRoom] = useJoinToRoomMutation();

  const roomInfo: Room | undefined = useMemo(() => {
    if (roomsRes) {
      const [roomInfo] = roomsRes.room;
      
      return roomInfo;
    }
  }, [roomsRes]);
  const avaiableToSeeMap: boolean = useMemo(() => {
    if (roomInfo && sessionsState.userId) {
      const userInHosts = roomInfo.hosts.includes(sessionsState.userId);
      const userInUsers = roomInfo.users.includes(sessionsState.userId);      
      const userInRequestedList = roomInfo.requestingUsers.includes(
        sessionsState.userId
      );

      if (userInRequestedList) {
        setLoaderMsg(LOADER_MSG_WAIT_FOR_ACCEPT);
        return false;
      } else if (userInHosts || userInUsers) {
        return true;
      }
    }

    setLoaderMsg(LOADER_MSG_NO_IN_ROOM);
    return false;
  }, [roomInfo]);

  const handleRequestAgain = () => {
    if (roomPin && sessionsState.userId) {
      joinToRoom({pin: roomPin, userId: sessionsState.userId});
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // intervals
  useEffect(() => {
    const id = setInterval(() => {

      setIterator((prev) => prev + 1);
    }, CHECK_USER_STATUS_TIMEOUT);

    setAcceptionIntervalId(id);

    return () => {
      clearInterval(acceptionIntervalId);
    }
  }, []);

  return (
    <View style={styles.container}>
      {location && avaiableToSeeMap ? (
        <>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
        {
         roomInfo && <Navbar topSection={<RoomInfo roomId={roomInfo.id } roomName={roomInfo.name} pin={roomInfo.pin}/>} bottomSection={<UserList hosts={roomInfo?.hosts} users={roomInfo.users} requestedUsers={roomInfo.requestingUsers} roomId={roomInfo.id}/>} />

        }
        </>
      ) : (
        <Loader
          text={loaderMsg}
          element={loaderMsg === LOADER_MSG_NO_IN_ROOM ? (
            <View style={{
              flexDirection: "row",
              marginTop: 20
            }}>
              <Button title="Leave" buttonStyle={{ marginHorizontal: 10 }} />
              <Button type="outline" title="Send Request" onPress={handleRequestAgain} />
            </View>
          ) : <></>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
