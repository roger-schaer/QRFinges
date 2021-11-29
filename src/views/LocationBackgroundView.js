import React, { useState, useEffect } from "react";
import { Switch, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { styles } from "../component/styles";
import moment from "moment";
import { t } from "i18next";
import {
  BACKGROUND_LOCATION_UPDATES_TASK,
  CURRENT_USER_ID,
} from "../constant/contants";

import {
  addRecordLocations,
  startRecordLocations,
  stopRecordLocations,
} from "../services/firebase";
import { getStorageData, setStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import { USER_ID } from "../utils/request";

const WALK_RECORD_KEY = "walkRecord";
const CURRENT_LAT = "currentLatitude";
const CURRENT_LON = "currentLongitude";

export const LocationBackgroundView = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [gpsErrorMsg, setGpsErrorMsg] = useState(null);
  const [currentWalkRecord, setCurrentWalkRecord] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [backgroundPermission, setBackgroundPermission] = useState(false);

  // const { t } = useTranslation();
  const { state } = useUserContext();

  const resetCurrentWalkRecord = () => {
    currentWalkRecord !== null &&
      stopRecordLocations(state.userId, currentWalkRecord);
    setCurrentWalkRecord(null);
    setStorageData(WALK_RECORD_KEY, null);
    setStorageData(CURRENT_LAT, null);
    setStorageData(CURRENT_LON, null);
    setLatitude(null);
    setLongitude(null);
    Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK);
  };

  useEffect(() => {
    getStorageData(WALK_RECORD_KEY).then((walkRecord) => {
      walkRecord == null ? setIsEnabled(false) : setIsEnabled(true);
    });
  }, []);

  useEffect(() => {
    console.log("useEffect/isEnabled", currentWalkRecord, isEnabled);

    getStorageData(WALK_RECORD_KEY)
      .then((walkRecord) => {
        // console.log(walkRecord, isEnabled);

        if (isEnabled) {
          console.log("before permissions", walkRecord, isEnabled);
          setCurrentWalkRecord(walkRecord);

          foregroundLocationFetch();
          backgroundLocationFetch();
        } else {
          resetCurrentWalkRecord();
        }
        console.log(walkRecord, isEnabled);
      })
      .catch((e) => {
        resetCurrentWalkRecord();
      });
  }, [isEnabled]);

  useEffect(() => {
    console.log("useEffect/currentWalkRecord", currentWalkRecord, isEnabled);

    if (currentWalkRecord == null && isEnabled) {
      startRecordLocations(state.userId)
        .then((walkRecord) => {
          setStorageData(WALK_RECORD_KEY, walkRecord.id);
          setCurrentWalkRecord(walkRecord.id);
        })
        .then(() => {
          uploadData();
        });
    } else if (currentWalkRecord != null && isEnabled) {
      const interval = setInterval(() => {
        uploadData();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentWalkRecord, isEnabled]);

  const backgroundLocationFetch = async () => {
    Location.requestBackgroundPermissionsAsync()
      .then((r) => {
        console.log("Background permission: " + r.status);
        setBackgroundPermission(r.granted);
        if (r.status !== "granted") {
          setGpsErrorMsg("Background permission to access location was denied");
          throw Error();
        }
      })
      .then(() => {
        Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 5,
          foregroundService: {
            notificationTitle: "Live Tracker",
            notificationBody: "Live Tracker is on.",
          },
        });
      })
      .catch((e) => {});
  };

  const foregroundLocationFetch = () => {
    Location.requestForegroundPermissionsAsync()
      .then((r) => {
        console.log("Foreground permission: " + r.status);
        if (r.status !== "granted") {
          setGpsErrorMsg("Foreground permission to access location was denied");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadData = async () => {
    getGPSPosition();
  };

  const getGPSPosition = async () => {
    /*let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });*/
    getStorageData("currentLatitude").then((lat) => setLatitude(lat));
    getStorageData("currentLongitude").then((lat) => setLongitude(lat));
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsEnabled}
        value={isEnabled}
      />

      <Text>{gpsErrorMsg}</Text>

      {isEnabled ? (
        <>
          <Text>
            Current location: {latitude} - {longitude}
          </Text>
        </>
      ) : (
        <Text>Feature desactivée</Text>
      )}
    </View>
  );
};

TaskManager.defineTask(
  BACKGROUND_LOCATION_UPDATES_TASK,
  async ({ data, error }) => {
    if (error) {
      console.log("Background error", error);
      return;
    }
    if (data) {
      const { locations } = data;
      setStorageData("currentLatitude", "" + locations[0].coords.latitude);
      setStorageData("currentLongitude", "" + locations[0].coords.longitude);
      getStorageData("walkRecord").then((wr) => {
        if (wr !== null) {
          console.log(
            `Background -> latitude: ${locations[0].coords.latitude} - longitude: ${locations[0].coords.longitude}`,
            wr
          );
          getStorageData(USER_ID).then((user_id) => {
            addRecordLocations(
              {
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
              },
              user_id,
              wr
            );
          });
        }
      });
    }
  }
);
