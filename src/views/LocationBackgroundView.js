import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Switch, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useTranslation } from "react-i18next";
import { BACKGROUND_LOCATION_UPDATES_TASK, LOCALSTORAGE_USER_ID } from "../constant/contants";

import { addRecordLocations, startRecordLocations, stopRecordLocations } from "../services/firebase";
import { GetInstantLocation } from "../services/location";
import { getStorageData, setStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import { LinearProgress } from "react-native-elements";
import { styles } from "../component/styles";
import moment from "moment";

const WALK_RECORD_KEY = "walkRecord";
const START_DATE = "startDate";
const CURRENT_LAT = "currentLatitude";
const CURRENT_LON = "currentLongitude";

export const LocationBackgroundView = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [gpsErrorMsg, setGpsErrorMsg] = useState(null);
  const [currentWalkRecord, setCurrentWalkRecord] = useState(null);
  const [refreshTimer, setRefreshTimer] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  let timer;
  const { state } = useUserContext();

  const resetCurrentWalkRecord = () => {
    currentWalkRecord !== null && stopRecordLocations(state.userId, currentWalkRecord);
    setCurrentWalkRecord(null);
    setStorageData(WALK_RECORD_KEY, null);
    setStorageData(CURRENT_LAT, null);
    setStorageData(CURRENT_LON, null);
    setStorageData(START_DATE, null);
    setLatitude(null);
    setLongitude(null);
    setStartDate(null);
    timer && clearTimeout(timer);
    Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK);
  };

  useEffect(() => {
    getStorageData(WALK_RECORD_KEY).then((walkRecord) => {
      walkRecord == null ? setIsEnabled(false) : setIsEnabled(true);
    });
  }, []);

  useEffect(() => {
    getStorageData(WALK_RECORD_KEY)
      .then((walkRecord) => {
        if (isEnabled) {
          setCurrentWalkRecord(walkRecord);

          /* foregroundLocationFetch(); */
          backgroundLocationFetch();
        } else {
          resetCurrentWalkRecord();
        }
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
          setStorageData(START_DATE, moment(new Date()).format("DD/MM/YYYY LTS"));
          setStorageData(WALK_RECORD_KEY, walkRecord.id);
          setCurrentWalkRecord(walkRecord.id);
        })
        .then((d) => {
          uploadData();
        });
    } else if (currentWalkRecord != null && isEnabled) {
      const interval = setInterval(() => {
        uploadData();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentWalkRecord, isEnabled]);

  const backgroundLocationFetch = async () => {
    await Location.requestBackgroundPermissionsAsync()
      .then((r) => {
        console.log("Background permission: " + r.status);
        console.log("ici");
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
      .catch(async () => {
        setRefreshTimer(1);
        Alert.alert(t("alert_location_background_issue"), " ", [
          {
            text: t("ok"),
          },
        ]);
      });
  };
  useEffect(() => {
    if (refreshTimer !== 0 && isEnabled) {
      timer = setTimeout(async () => {
        const loc = await GetInstantLocation();
        console.log(loc);
        setStorageData(CURRENT_LAT, "" + loc.latitude);
        setStorageData(CURRENT_LON, "" + loc.longitude);
        setRefreshTimer(refreshTimer + 1);
        getStorageData(WALK_RECORD_KEY).then((walkRecord) => {
          addRecordLocations(
            {
              latitude: loc.latitude,
              longitude: loc.longitude,
            },
            state.userId,
            walkRecord
          );
        });

        timer && clearTimeout(timer);
      }, 10000);
    }
  }, [refreshTimer]);
  /* const foregroundLocationFetch = () => {
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
  }; */

  const uploadData = async () => {
    getGPSPosition();
  };

  const getGPSPosition = async () => {
    getStorageData(CURRENT_LAT).then((lat) => setLatitude(lat));
    getStorageData(CURRENT_LON).then((lat) => setLongitude(lat));
    getStorageData(START_DATE).then((d) => setStartDate(d));
  };

  const { t } = useTranslation();

  return (
    <>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsEnabled}
        value={isEnabled}
      />

      <Text>{gpsErrorMsg}</Text>
      {isEnabled ? (
        <View style={styles.timerLine}>
          <View>
            <Text style={{ fontWeight: "bold", paddingBottom: 10 }}>{t("actualWalk")}</Text>
            <Text style={styles.timerText}>
              {t("startTrack")}
              {startDate}
            </Text>
            <Text style={styles.timerText}>{t("locationTrack")}</Text>
            {latitude && longitude ? (
              <>
                <Text style={styles.timerTexts}>latitude :{latitude}</Text>
                <Text style={styles.timerTexts}>longitude :{longitude}</Text>
              </>
            ) : (
              <ActivityIndicator style={{ marginBottom: 15 }} />
            )}
          </View>
        </View>
      ) : (
        <Text>{t("feature")}</Text>
      )}
      {isEnabled && <LinearProgress color="darkgreen" />}
    </>
  );
};

TaskManager.defineTask(BACKGROUND_LOCATION_UPDATES_TASK, async ({ data, error }) => {
  if (error) {
    console.log("Background error", error);
    return;
  }
  if (data) {
    const { locations } = data;
    setStorageData(CURRENT_LAT, "" + locations[0].coords.latitude);
    setStorageData(CURRENT_LON, "" + locations[0].coords.longitude);
    getStorageData("walkRecord").then((wr) => {
      if (wr !== null) {
        console.log(
          `Background -> latitude: ${locations[0].coords.latitude} - longitude: ${locations[0].coords.longitude}`,
          wr
        );
        getStorageData(LOCALSTORAGE_USER_ID).then((user_id) => {
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
});
