import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { Camera } from "expo-camera";

export function askCameraPermission() {
  const [hasPermission, setHasPermission] = useState(null);
  const { t, i18n } = useTranslation();

  const askForPermission = () => {
    (async () => {
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted");

        if (status === "granted") {
          console.log("permission granted");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  useEffect(() => {
    askForPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.screen}>
        <Text>{t("askCameraPermission")}</Text>
        <Button title={"Allow camera"} onPress={() => askForPermission()} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.screen}>
        <Text style={{ margin: 10 }}>{t("needCameraPermission")}</Text>
        <Button
          title={"You need camera to continue"}
          onPress={() => askForPermission()}
        />
      </View>
    );
  }
}
