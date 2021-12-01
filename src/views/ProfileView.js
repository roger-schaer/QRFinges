import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { LinearProgress } from "react-native-elements";
import { LocationBackgroundView } from "./LocationBackgroundView";
import { styles } from "../component/styles";
import { QR_CODE_KEY } from "../constant/contants";
import { ScrollView } from "react-native-gesture-handler";

const ProfileView = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <ScrollView>
      <View style={stylesProfile.screen}>
        <Text style={styles.title}>{t("profileHead")}</Text>
        <LocationBackgroundView />

        <View style={styles.timerLine}>
          <Text style={styles.title}> {t("scanQR")}</Text>
          <AntDesign
            style={styles.iconContainer}
            name={"qrcode"}
            size={50}
            onPress={() => props.navigation.navigate(QR_CODE_KEY)}
          />
        </View>
        <View>
          <Text style={styles.title}> {t("syncData")}</Text>
        </View>
        {/* afficher soit LinearProgress ou l'icon de données selon du status de connexion*/}

        <View>
          <AntDesign style={styles.iconSyncContainer} name={"sync"} size={30} />
        </View>
      </View>
    </ScrollView>
  );
};

const stylesProfile = StyleSheet.create({
  screen: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
  },
});

export default ProfileView;
