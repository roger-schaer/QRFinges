import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Text, View } from "react-native";

export const TranslationView = () => {
  const { t, i18n } = useTranslation();

  return (
    <View style={{ justifyContent: "center" }}>
      <Text>{t("main_title")}</Text>
      <Button
        onPress={() => {
          i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");
          console.log(t("main_title"));
        }}
        title="Change language"
      />
    </View>
  );
};
