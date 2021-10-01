import React from "react";
import { StatusBar, View, Button, Text } from "react-native";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <View>
      <Text>{t("main_title")}</Text>
      <Button
        onPress={() => {
          i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");
          console.log(t("main_title"));
        }}
        title="Change language"
      />
      <StatusBar />
    </View>
  );
};

export default Home;
