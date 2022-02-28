import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Button, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useTranslation } from "react-i18next";
import {
  BACKGROUND_LOCATION_UPDATES_TASK,
  FIRESTORE_WALK_HISTORY_KEY,
} from "../constant/constants";
import { Switch } from "react-native-switch";

import {
  addWalkLocations,
  startRecordLocations,
  stopRecordLocations,
} from "../services/firebase";
import { isInForest, notifyForestExist } from "../services/location";
import { getStorageData, setStorageData } from "../services/storage";
import { useUserContext } from "../services/user-context";
import { LinearProgress } from "react-native-elements";
import { styles } from "../component/styles";
import moment from "moment";
import { auth } from "../services/firebase";
import * as Notifications from "expo-notifications";

const START_DATE = "startDate";
const CURRENT_LAT = "currentLatitude";
const CURRENT_LON = "currentLongitude";

export const LocationBackgroundView = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [gpsErrorMsg, setGpsErrorMsg] = useState(null);
  const [currentWalk, setCurrentWalk] = useState(null);
  const [refreshTimer, setRefreshTimer] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  let timer;
  const { state } = useUserContext();

  const resetCurrentWalk = async () => {
    currentWalk !== null &&
      (await stopRecordLocations(state.userId, currentWalk));
    setCurrentWalk(null);
    setStorageData(FIRESTORE_WALK_HISTORY_KEY, null);
    setStorageData(CURRENT_LAT, null);
    setStorageData(CURRENT_LON, null);
    setStorageData(START_DATE, null);
    setLatitude(null);
    setLongitude(null);
    setStartDate(null);
    timer && clearTimeout(timer);
    let isTaskRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_LOCATION_UPDATES_TASK
    );
    if (isTaskRegistered)
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK);
  };

  useEffect(() => {
    getStorageData(FIRESTORE_WALK_HISTORY_KEY).then((walk) => {
      walk == null ? setIsEnabled(false) : setIsEnabled(true);
    });
  }, []);

  useEffect(() => {
    async function initWalk() {
      getStorageData(FIRESTORE_WALK_HISTORY_KEY)
        .then(async (walk) => {
          if (isEnabled) {
            setCurrentWalk(walk);
            /* foregroundLocationFetch(); */
            await backgroundLocationFetch();
          } else {
            await resetCurrentWalk();
          }
        })
        .catch(async (e) => {
          console.error(e);
          await resetCurrentWalk();
        });
    }

    initWalk();
  }, [isEnabled]);

  useEffect(() => {
    console.log("useEffect/currentWalk", currentWalk, isEnabled);

    if (currentWalk == null && isEnabled) {
      startRecordLocations(state.userId)
        .then((walk) => {
          setStorageData(
            START_DATE,
            moment(new Date()).format("DD/MM/YYYY LTS")
          );
          setStorageData(FIRESTORE_WALK_HISTORY_KEY, walk.id);
          setCurrentWalk(walk.id);
        })
        .then(async (d) => {
          await uploadData();
        });
    } else if (currentWalk != null && isEnabled) {
      // TODO - Check if this is the best way to handle this!
      const interval = setInterval(async () => {
        await uploadData();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentWalk, isEnabled]);

  // Listener to get the data of the notification
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // if the data is tracking, we put the switch off for the tracking
        if (notification.request.content.data.tracking === "tracking") {
          setIsEnabled(false);
        }
      }
    );
    return () => subscription.remove();
  }, []);

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
          accuracy: Location.Accuracy.High,
          distanceInterval: 50,
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

  const uploadData = async () => {
    await getGPSPosition();
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
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={isEnabled ? "#006400" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsEnabled}
        value={isEnabled}
        activeText={t("stop_tracking")}
        inActiveText={t("start_tracking")}
        circleActiveColor={"#30a566"}
        circleInActiveColor={"#000000"}
        circleSize={80}
      />

      <Text>{gpsErrorMsg}</Text>
      {isEnabled ? (
        <View style={styles.timerLine}>
          <View>
            <Text style={{ fontWeight: "bold", paddingBottom: 10 }}>
              {t("actualWalk")}
            </Text>
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

TaskManager.defineTask(
  BACKGROUND_LOCATION_UPDATES_TASK,
  async ({ data, error }) => {
    if (error) {
      console.log("Background error", error);
      return;
    }

    if (data) {
      const { locations } = data;

      console.log(`Got ${locations.length} new locations`);

      setStorageData(CURRENT_LAT, "" + locations[0].coords.latitude);
      setStorageData(CURRENT_LON, "" + locations[0].coords.longitude);
      getStorageData(FIRESTORE_WALK_HISTORY_KEY).then(async (walk) => {
        if (walk !== null) {
          console.log(
            `Background -> latitude: ${locations[0].coords.latitude} - longitude: ${locations[0].coords.longitude}`,
            walk
          );

          let userID = auth.currentUser.uid;

          //Condition for the zone
          if (
            !isInForest(
              locations[0].coords.latitude,
              locations[0].coords.longitude
            )
          ) {
            console.log("User exited the Finges Forest area");

            //Push the notification if the user is not in the zone
            await notifyForestExist();
          }

          await addWalkLocations(
            {
              date: new Date(locations[0].timestamp),
              latitude: locations[0].coords.latitude,
              longitude: locations[0].coords.longitude,
            },
            userID,
            walk
          );
        }
      });
    }
  }
);
