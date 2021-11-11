import React, { useState, useEffect } from "react";
import { Switch, Text, View } from "react-native";
import * as Location from "expo-location";
import "../config/firebaseDb";
import {
  addLocationToCurrentWalkRecord,
  startRecordLocations,
} from "../services/firebase";

export const LocationView = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [currentFirebasebId, setCurrentFirebasebId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [locations, setLocations] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  let watch;
  useEffect(() => {
    if (isEnabled) {
      const startRecord = async () => {
        Location.requestForegroundPermissionsAsync();
        /*if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        } */
        const res = await startRecordLocations();
        setCurrentFirebasebId(res.id);

        /*  */
        watch = Location.watchPositionAsync(
          { distanceInterval: 5, accuracy: Location.Accuracy.Balanced },
          (l) => {
            if (currentFirebasebId) {
              console.log(l);
              setCurrentLocation(l);
              addLocationToCurrentWalkRecord(currentFirebasebId, l);
              setLocations((old) => [l, ...old]);
            }
          }
        );
      };
      startRecord();
    } else {
      setLocations([]);
      setCurrentFirebasebId(null);
      console.log(watch);
      watch ? watch.remove() : null;
    }
  }, [isEnabled]);

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
