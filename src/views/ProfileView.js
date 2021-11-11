import React from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { LinearProgress } from "react-native-elements";
import { LocationBackgroundView } from "./LocationBackgroundView";

const ProfileView = (props) => {
  const { t, i18n } = useTranslation();

  i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");

  return (
    <View style={styles.screen}>

      <Button
        title="Mes Infos"
        onPress={() => props.navigation.navigate("InfoRegisteredUser")}
      />
      <Button
        title="Contact"
        onPress={() => props.navigation.navigate("Contact")}
      />
      <Text style={styles.title}>{t("profileHead")}</Text>
      <View style={styles.startContainer}>
        <AntDesign
          style={styles.iconContainer}
          name={"playcircleo"}
          size={30}
        />
        {Platform.OS !== "web" ? <LocationBackgroundView /> : null}
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
      </View>
      <View>
        <Text style={styles.title}> {t("scanQR")}</Text>
        <AntDesign style={styles.iconContainer} name={"qrcode"} size={50} />
        <Button
          title="go to scann"
          onPress={() => props.navigation.navigate("QRcodePage")}
        />
      </View>
      <View>
        <Text style={styles.title}> {t("syncData")}</Text>
      </View>
      {/* afficher soit LinearProgress ou l'icon de données selon du status de connexion*/}
      <LinearProgress color="darkgreen" />
      <View>
        <AntDesign style={styles.iconSyncContainer} name={"sync"} size={30} />
      </View>
      <View>
        <Button
          title="Go to Home"
          onPress={() => props.navigation.navigate("Home")}
        />
        <Button title="FAQ" onPress={() => props.navigation.navigate("Help")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
  },

  title: {
    //  flex : 1,
    fontSize: 16,
    fontWeight: "700",
    color: "darkgreen",
    padding: 10,
  },

  startContainer: {
    //  flex : 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 70,
  },

  timerContainer: {
    flexDirection: "column",
  },

  timerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "darkgreen",
    paddingRight: 30,
    paddingBottom: 20,
  },

  timerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 35,
  },

  scanContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  SyncContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconContainer: {
    color: "darkgreen",
    padding: 10,
  },

  iconSyncContainer: {
    color: "darkgreen",
    paddingTop: 20,
    paddingLeft: 150,
    alignItems: "center",
  },
});

export default ProfileView;
