import React from "react";
import { StatusBar, View, Button, Text } from "react-native";
import I18n from "../services/i18n";

const Home = () => {
  return (
    <View>
      <Text>{I18n.t("main_title")}</Text>
      <Button
        onPress={() => {
          I18n.locale = "en";
          console.log(I18n.t("main_title"));
          I18n.locale = "fr";
          console.log(I18n.t("main_title"));
        }}
        title="Change language"
      />
      <StatusBar />
    </View>
  );
};

export default Home;
