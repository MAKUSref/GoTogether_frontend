import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import Loader from "../lib/loader/Loader";
import {
  useFetchRoomByPinQuery,
  useFetchUsersInfoFromRoomQuery,
  useJoinToRoomMutation,
  useLeaveRoomMutation,
  useUpdateCoordsMutation,
} from "../../feature/api/apiSlice";
import { Room } from "../../feature/api/types";
import { Button, SpeedDial } from "react-native-elements";
import { getColorFromUUID } from "../../styles/colors";
import Navbar from "../navbars/Navbar";
import RoomInfo from "../navbars/mapNavbar/RoomInfo";
import UserList from "../navbars/mapNavbar/UserList";
import SpeechButton from "./SpeechButton";
import UserInfo from "../navbars/navbar/UserInfo";

const CHECK_USER_STATUS_TIMEOUT = 2000;
const LOCATION_TIMEOUT = 1000;

const LOADER_MSG_LOADING = "Loading...";
const LOADER_MSG_WAIT_FOR_ACCEPT = "Waiting for accept your request...";
const LOADER_MSG_NO_IN_ROOM =
  "You are no longer in this room. Leave it or send request again.";

const Map = ({ navigation, route }: NavigationProps<Routes.Map>) => {
  const { roomPin } = route.params;

  const [locationIntervalId, setLocationIntervalId] = useState<NodeJS.Timer | undefined>();
  const [iterator, setIterator] = useState<number>(0);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loaderMsg, setLoaderMsg] = useState<string>(LOADER_MSG_LOADING);

  const sessionsState = useAppSelector((state) => state.session);

  const { data: roomsRes } = useFetchRoomByPinQuery({ roomPin, i: iterator });
  const { data: usersInfo } = useFetchUsersInfoFromRoomQuery(roomPin);
  const [joinToRoom] = useJoinToRoomMutation();
  const [leaveRoom] = useLeaveRoomMutation();
  const [sendCoords] = useUpdateCoordsMutation();

  const filteredUsers = useMemo(() => {
    const users = usersInfo?.user.filter((user) => user.id !== sessionsState.userId);

    return users ?? [];
  }, [usersInfo]);

  const userColor = useMemo(() => {
    return getColorFromUUID(sessionsState.userId ?? "0");
  }, [sessionsState]);

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
      joinToRoom({ pin: roomPin, userId: sessionsState.userId });
    }
  };

  const handleLeave = () => {
    if(roomInfo){
      leaveRoom({roomId: roomInfo?.id})
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();

  }, []);

  // useEffect(() => {
  //   console.log(usersInfo);
  // }, [usersInfo])

  // intervals
  // Check user status
  useEffect(() => {
    const id = setInterval(() => {
      setIterator((prev) => prev + 1);
    }, CHECK_USER_STATUS_TIMEOUT);

    return () => {
      clearInterval(id);
    };
  }, []);

  // get new location
  useEffect(() => {
    let id: NodeJS.Timer | undefined;

    if (avaiableToSeeMap) {
      id = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        sendCoords({
          lat: location.coords.latitude,
          long: location.coords.longitude,
          radius: 1,
          timestamp: Date.now()
        })
      }, LOCATION_TIMEOUT);
    }

    return () => {
      clearInterval(id);
    };
  }, [avaiableToSeeMap]);

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
            >
              <View style={[styles.markerBg]}>
                <View style={[styles.marker, {
                  backgroundColor: userColor
                }]}>
                </View>
              </View>
              
            </Marker>

            {filteredUsers.map((user, i) => {
              const userColor = getColorFromUUID(user.id);

              if (!user.coords) return;
              
              return (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: user.coords.lat,
                    longitude: user.coords.long,
                  }}
                >
                  <View style={[styles.markerBg]}>
                    <View style={[styles.marker, {
                      backgroundColor: userColor
                    }]}>
                    </View>
                  </View>
                </Marker>
              );
            })}

          </MapView>

          <View style={[styles.usersContainer]}>
            <View style={[styles.userAvatar, { backgroundColor: userColor }]}>
              <Text style={[styles.avatarText]}>
                {sessionsState.username?.[0].toUpperCase()}
              </Text>
            </View>

            {filteredUsers.map((user, i) => {
              const userColor = getColorFromUUID(user.id);
              return (
                <View key={i} style={[styles.userAvatar, { backgroundColor: userColor }, styles.userAvatarSmall]}>
                  <Text style={[styles.avatarText]}>
                    {user.name[0].toUpperCase()}
                  </Text>
                </View>
              );
            })}
          </View>
          <SpeechButton others={filteredUsers} you={{lat: location.coords.latitude, long: location.coords.longitude}}/>

          {roomInfo && (
            <Navbar
              topSection={
                <RoomInfo
                  roomId={roomInfo.id}
                  roomName={roomInfo.name}
                  pin={roomInfo.pin}
                />
              }
              bottomSection={
                <UserList
                  hosts={roomInfo?.hosts}
                  users={roomInfo.users}
                  requestedUsers={roomInfo.requestingUsers}
                  roomId={roomInfo.id}
                />
              }
            />
          )}
        </>
      ) : (
        <Loader
          text={loaderMsg}
          element={
            loaderMsg === LOADER_MSG_NO_IN_ROOM ? (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <Button title="Leave" buttonStyle={{ marginHorizontal: 10 }} onPress={handleLeave} />
                <Button
                  type="outline"
                  title="Send Request"
                  onPress={handleRequestAgain}
                />
              </View>
            ) : undefined
          }
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
  usersContainer: {
    flexDirection: "row",
    alignItems: 'center',
    position: "absolute",
    paddingTop: 40,
    top: 0,
    left: 0,
    width: "100%",
  },
  userAvatar: {
    marginVertical: 10,
    marginHorizontal: 4,
    width: 60,
    height: 60,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarSmall: {
    width: 50,
    height: 50,
  },
  avatarText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    // textAlign: "center"
  },
  markerBg: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
});

export default Map;
