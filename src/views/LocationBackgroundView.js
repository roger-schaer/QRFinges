import React, { useState, useEffect } from "react";
import { Switch, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { styles } from "../component/styles";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { BACKGROUND_LOCATION_UPDATES_TASK } from "../constant/contants";
import {
  requestBackgroundPermissions,
  requestForegroundPermissions,
} from "../services/location";
import { startRecordLocations } from "../services/firebase";

export const LocationBackgroundView = () => {
  const [gpsLatitude, setgpsLatitude] = useState(null);
  const [gpsLongitude, setgpsLongitude] = useState(null);
  const [gpsErrorMsg, setGpsErrorMsg] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    (async () => await _askForLocationPermission())();

    const interval = setInterval(() => {
      uploadDataAtInterval();
    }, 10000);
    return () => clearInterval(interval);
  });

  const backgroundLocationFetch = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      console.log("cmon dance with me!");
      await Location.startLocationUpdatesAsync(
        BACKGROUND_LOCATION_UPDATES_TASK,
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 1,
          foregroundService: {
            notificationTitle: "Live Tracker",
            notificationBody: "Live Tracker is on.",
          },
        }
      );
    }
  };

  const _askForLocationPermission = async () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setGpsErrorMsg("Permission to access location was denied");
      }
    })();
  };

  const uploadDataAtInterval = async () => {
    console.log("upload using axios");
  };

  const getGPSPosition = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setgpsLatitude(location.coords.latitude);
    setgpsLongitude(location.coords.longitude);
  };

  backgroundLocationFetch();

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.timerContainer}>
        <View style={styles.timerLine}>
          <Text style={styles.timerText}> {t("start")} </Text>
          <View>
            <Text style={styles.timerText}> {moment().format("LTS")}</Text>
          </View>
        </View>
        <View style={styles.timerLine}>
          <Text style={styles.timerText}> {t("end")} </Text>
          <View>
            <Text style={styles.timerText}> {moment().format("LTS")}</Text>
          </View>
        </View>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsEnabled}
        value={isEnabled}
      />

      <Text>Timers: {timer}</Text>

      {isEnabled ? (
        <>
          <Text>
            Current location: {gpsLatitude} - {gpsLongitude}
          </Text>
        </>
      ) : (
        <Text>Feature desactivée</Text>
      )}
    </View>
  );
};

TaskManager.defineTask(BACKGROUND_LOCATION_UPDATES_TASK, ({ data, error }) => {
  if (error) {
    console.log("Error bg", error);
    return;
  }
  if (data) {
    const { locations } = data;
    startRecordLocations(locations);
    console.log(
      "BGGGG->",
      locations[0].coords.latitude,
      locations[0].coords.longitude
    );
  }
});
