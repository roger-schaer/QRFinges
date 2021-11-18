import React from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../component/styles";
import { CustomButton } from "../component/CustomButton";

const InfoRegisteredUserView = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t("helpCenterHead")}</Text>
      <Text style={styles.text}>{t("myAccount")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <Text style={styles.text}>{t("registerTrace")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <Text style={styles.text}>{t("sendWalk")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <Text style={styles.text}>{t("personalData")}</Text>
      <Text style={styles.content}>bla-bla</Text>

      <CustomButton onPress={() => props.navigation.navigate("contact")}>
        {t("refusalButton")}
      </CustomButton>
    </View>
  );
};
export default InfoRegisteredUserView;
