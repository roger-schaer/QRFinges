import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { t } from "i18next";
import { styles } from "../component/styles";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export function askCameraPermission() {
  const [hasPermission, setHasPermission] = useState(null);

  const askForPermission = () => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");

        if (status === "granted") {
          console.log("permission granted");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  useEffect(() => {
    askForPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.screen}>
        <Text>{t("needCameraPermission")}</Text>
        <Button title={t("allowCamera")} onPress={() => askForPermission()} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.screen}>
        <Text style={{ margin: 10 }}>{t("needCameraPermission")}</Text>
        <Button title={t("allowCamera")} onPress={() => askForPermission()} />
      </View>
    );
  }
}

export function askLocalisationPermission() {
  const [hasPermission, setHasPermission] = useState(null);

  const askForPermission = () => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setHasPermission(status === "granted");

        if (status === "granted") {
          console.log("permission granted");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  useEffect(() => {
    askForPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.screen}>
        <Text>{t("needLocationPermission")}</Text>
        <Button title={t("allowLocation")} onPress={() => askForPermission()} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.screen}>
        <Text style={{ margin: 10 }}>{t("needLocationPermission")}</Text>
        <Button title={t("allowLocation")} onPress={() => askForPermission()} />
      </View>
    );
  }
}
