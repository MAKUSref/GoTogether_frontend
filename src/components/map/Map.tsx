import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import Loader from "../lib/loader/Loader";
import { useFetchRoomByPinQuery } from "../../feature/api/apiSlice";
import { Room } from "../../feature/api/types";

const ACCEPTION_REQUESTS_TIMEOUT = 2000;

const Map = ({ navigation, route }: NavigationProps<Routes.Map>) => {
  const { roomPin } = route.params;

  const [acceptionIntervalId, setAcceptionIntervalId] = useState<
    NodeJS.Timer | undefined
  >();
  const [iterator, setIterator] = useState<number>(0);
  const [location, setLocation] = useState<LocationObject | null>(null);

  const sessionsState = useAppSelector((state) => state.session);

  const { data: roomsRes } = useFetchRoomByPinQuery({ roomPin, i: iterator });

  const roomInfo: Room | undefined = useMemo(() => {
    if (roomsRes) {
      const [roomInfo] = roomsRes.room;
      return roomInfo;
    }
  }, [roomsRes]);

  const avaiableToSeeMap: boolean = useMemo(() => {
    if (roomInfo && sessionsState.userId) {
      const inRequestedList = roomInfo.requestingUsers.includes(
        sessionsState.userId
      );

      return !inRequestedList;
    }

    return false;
  }, [roomInfo]);

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
    if (avaiableToSeeMap) {
      clearInterval(acceptionIntervalId);
    }
  }, [avaiableToSeeMap]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(iterator);

      setIterator((prev) => prev + 1);
    }, ACCEPTION_REQUESTS_TIMEOUT);

    setAcceptionIntervalId(id);
  }, []);

  return (
    <View style={styles.container}>
      {location && avaiableToSeeMap ? (
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
      ) : (
        <Loader
          text={
            avaiableToSeeMap
              ? "Loading map..."
              : "Waiting for accept your request..."
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
});

export default Map;
