import React from "react";
import "./src/services/i18n";
import "react-native-gesture-handler";
import { UserProvider } from "./src/services/user-context";

import NavWithMenu from "./src/component/Navigation";

import { LogBox } from "react-native";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";

import { Provider as PaperProvider } from "react-native-paper";

LogBox.ignoreLogs(["Setting a timer for a long period"]);

const App = () => {
  return (
    <UserProvider>
      <PaperProvider>
        <NavWithMenu />
        <StatusBar style="auto" />
      </PaperProvider>
    </UserProvider>
  );
};

// Setup notification handler when the app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default App;
