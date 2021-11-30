import React from "react";
import { View, Text, Button } from "react-native";
import { t } from "i18next";
import { styles } from "../component/styles";
import { CustomButton } from "../component/CustomButton";
import CreateProfilePageView from "./CreateProfilePageView";
import { CONTACT_KEY, SUBSCRIBE_KEY } from "../constant/contants";

const InfoNonRegisteredUserView = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t("infoHead")}</Text>
      <Text style={styles.text}>{t("createAccount")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <Text style={styles.text}>{t("followTuto")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <Text style={styles.text}>{t("sendWalk")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <Text style={styles.text}>{t("personalData")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <CustomButton onPress={() => props.navigation.navigate(SUBSCRIBE_KEY)}>
        {t("acceptButton")}
      </CustomButton>

      <CustomButton onPress={() => props.navigation.navigate(CONTACT_KEY)}>
        {t("refusalButton")}
      </CustomButton>
    </View>
  );
};
export default InfoNonRegisteredUserView;
