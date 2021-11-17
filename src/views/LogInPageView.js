import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { Logo } from "../component/Logo";
import { CustomButton } from "../component/CustomButton";
import { CustomButtonNoBorders } from "../component/CustomButtonNoBorders";
import { styles } from "../component/styles";

const LoginPageView = (props) => {

  const { t, i18n } = useTranslation();

  return (
    <View style={styles.screen}>
      <Logo style={styles.logoContainer} />
      <Text style={styles.title}>{t("welcomePhrase")}</Text>
      <TextInput
        placeholder={t("email")}
        placeholderTextColor={"darkgreen"}
        style={styles.input}
      />
      <TextInput
        placeholder={t("pass")}
        placeholderTextColor={"darkgreen"}
        style={styles.input}
      />

      <CustomButton onPress={(event) => props.navigation.navigate("Profile")}>
        {t("connect")}
      </CustomButton>

      <CustomButtonNoBorders
        onPress={(event) => props.navigation.navigate("CreateProfile")}
      >
        {t("subscribe")}
      </CustomButtonNoBorders>
    </View>
  );
};

export default LoginPageView;
