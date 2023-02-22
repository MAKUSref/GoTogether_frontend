import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import Loader from '../lib/loader/Loader';
import { Avatar } from '@rneui/themed';
import {StatusBar, ScrollView} from 'react-native';



const Users = [
  {
    id: "d5928e48-45f5-48ba-abab-891595c3f90e",
    name: "tom",
    login: "aaadqw",
    password: "aaasd",
    type : "User"
},
{
    id: "ea88150d-420e-4aa0-9d11-829d79bed8f0",
    name: "tom2",
    login: "mati",
    password: "mati",
    type: "User"
},
{
  id: "d5928e48-45f5-48ba-abab-891595c3f90e",
  name: "tom",
  login: "aaadqw",
  password: "aaasd",
  type : "User"
},
{
  id: "ea88150d-420e-4aa0-9d11-829d79bed8f0",
  name: "tom2",
  login: "mati",
  password: "mati",
  type: "User"
},
  {
    id: "d5928e48-45f5-48ba-abab-891595c3f90e",
    name: "tom",
    login: "aaadqw",
    password: "aaasd",
    type : "User"
},
{
    id: "ea88150d-420e-4aa0-9d11-829d79bed8f0",
    name: "tom2",
    login: "mati",
    password: "mati",
    type: "User"
},
{
  id: "ea88150d-420e-4aa0-9d11-829d79bed8f0",
  name: "tom2",
  login: "mati",
  password: "mati",
  type: "User"
},
{
  id: "d5928e48-45f5-48ba-abab-891595c3f90e",
  name: "tom",
  login: "aaadqw",
  password: "aaasd",
  type : "User"
},
{
  id: "ea88150d-420e-4aa0-9d11-829d79bed8f0",
  name: "tom2",
  login: "mati",
  password: "mati",
  type: "User"
},
];

const Map = ({ navigation }: NavigationProps<Routes.Map>) => {
  const [location, setLocation] = useState<LocationObject | null>(null);


  const sessionsState = useAppSelector((state) => state.session);

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

  return (
    <View style={styles.container}>
      {location ? (
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
        <ScrollView style={styles.avatarsContainer}>
          {Users.map((user) => (
            <View style={styles.avatarStyle}>
                <Avatar
                  size={64} 
                  rounded
                  title={user.name.substring(0, 1).toLocaleUpperCase()+ user.name.substring(1, 2)}
                  containerStyle={{ backgroundColor: "blue" }}
                  
                />            
            </View>
          ))}
        </ScrollView>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  avatarsContainer: {
    position: "absolute",
    backgroundColor: "white",
    marginLeft: 10,
    marginTop: 10,
  },
  avatarStyle: {
    margin: 5,
    marginTop: 5,
    flexBasis: "18%",
    }
});

export default Map;
