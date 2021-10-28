import React, { useState, useEffect } from "react";
import { Switch, Text, View } from "react-native";
import * as Location from "expo-location";

export const LocationPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      if (isEnabled) {
        /* await Location.watchPositionAsync({ timeInterval: 100 }, (l) => {
          console.log(l);
          setCurrentLocation(l);
          setLocations((old) => [...old, l]);
        }); */

        const location = await Location.getCurrentPositionAsync({
          accuracy: 100,
        });
        console.log(location);
        setCurrentLocation(location);
        setLocations([location, ...locations]);
        locations.push(location);
        setTimeout(() => {
          setTimer(timer + 1);
        }, 1000);
      }
    })();
  }, [isEnabled, timer]);

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
      <Text>Timer: {timer}</Text>

      {isEnabled ? (
        <Text>Current location: {text}</Text>
      ) : (
        <Text>Feature desactivée</Text>
      )}
      {locations.map((l, i) => (
        <Text key={`text-${i}`}>{JSON.stringify(l)}</Text>
      ))}
    </View>
  );
};
