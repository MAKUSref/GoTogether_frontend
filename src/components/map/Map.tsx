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
import { getColorFromUUID, PRIMARY_COLOR_DARK } from "../../styles/colors";

const CHECK_USER_STATUS_TIMEOUT = 2000;
const LOCATION_TIMEOUT = 1500;

const LOADER_MSG_LOADING = "Loading...";
const LOADER_MSG_WAIT_FOR_ACCEPT = "Waiting for accept your request...";
const LOADER_MSG_NO_IN_ROOM = "You are no longer in this room. Leave it or send request again.";

const Map = ({ navigation, route }: NavigationProps<Routes.Map>) => {
  const { roomPin } = route.params;

  const [locationIntervalId, setLocationIntervalId] = useState<NodeJS.Timer | undefined>();
  const [iterator, setIterator] = useState<number>(0);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loaderMsg, setLoaderMsg] = useState<string>(LOADER_MSG_LOADING);

  const sessionsState = useAppSelector((state) => state.session);

  const { data: roomsRes } = useFetchRoomByPinQuery({ roomPin, i: iterator });
  const [joinToRoom] = useJoinToRoomMutation();

  const userColor = useMemo(() => {
    return getColorFromUUID(sessionsState.userId ?? "0")
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
      joinToRoom({pin: roomPin, userId: sessionsState.userId});
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

  // intervals
  useEffect(() => {
    const id = setInterval(() => {
      setIterator((prev) => prev + 1);
    }, CHECK_USER_STATUS_TIMEOUT);

    return () => {
      clearInterval(id);
    }
  }, []);

  useEffect(() => {
    let id: NodeJS.Timer | undefined;

    if (avaiableToSeeMap) {
      id = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }, LOCATION_TIMEOUT);
    }

    return () => {
      clearInterval(id);
    }
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
              <View>
                <Text>Marker</Text>
              </View>
            </Marker> 
          </MapView>
          <View style={[styles.usersContainer]}>
            <View style={[styles.userAvatar, { backgroundColor: userColor }]}>
              <Text style={[styles.avatarText]}>{sessionsState.username?.[0].toUpperCase()}</Text>
            </View>
          </View>
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
          ) : undefined}
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
    position: 'absolute',
    paddingTop: 40,
    top: 0,
    left: 0,
    width: '100%',
  },
  userAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    // textAlign: "center"
  }
});

export default Map;
