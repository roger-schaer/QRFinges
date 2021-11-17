import React, { useState, useEffect } from "react";
import { Switch, Text, Touchable, View } from "react-native";
import * as Location from "expo-location";
import "../config/firebaseDb";
import { startRecordLocations } from "../services/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { firebaseDb } from "../config/firebaseDb";

export const LocationView = () => {
  let watch;

  const [currentLocation, setCurrentLocation] = useState({});
  const [currentFirebasebId, setCurrentFirebasebId] = useState(null);
  const [locations, setLocations] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const startRecord = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    if (!currentFirebasebId) {
      const res = await startRecordLocations();
      // setCurrentFirebasebId(res.id);

      watch = Location.watchPositionAsync(
        { distanceInterval: 5, accuracy: Location.Accuracy.Highest },
        (location) => {
          console.log(location);
          setCurrentLocation(location);
          // addLocationToCurrentWalkRecord(currentFirebasebId, location);

          // setLocations((old) => [l, ...old]);
        }
      );
    }
    // let location = await Location.getCurrentPositionAsync({});
    // setCurrentLocation(location);
    // setLocations((old) => [location, ...old]);
  };
  useEffect(() => {
    /* if (isEnabled) {
      startRecord();
    } else {
      setLocations([]);
      setCurrentFirebasebId(null);
      console.log(watch);
      watch ? watch.remove() : null;
    } */
  }, [isEnabled]);

  /* useEffect(() => {
    if (currentFirebasebId) {
      addLocationToCurrentWalkRecord(currentFirebasebId, location);
      // startRecord();
    }
  }, [location]); */
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
      <Text>Number of locations: {locations.length}</Text>

      {isEnabled ? (
        <>
          <Text>Current location: {text}</Text>
        </>
      ) : (
        <Text>Feature desactivée</Text>
      )}
      {locations.map((l, i) => (
        <Text key={`text-${i}`}>{JSON.stringify(l)}</Text>
      ))}
    </View>
  );
};
