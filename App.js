import React from "react";
import "./src/services/i18n";
import "react-native-gesture-handler";
import { UserProvider } from "./src/services/user-context";

import NavWithMenu from "./src/component/Navigation";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer for a long period"]);

const App = () => {
  return (
    <UserProvider>
      <NavWithMenu />
    </UserProvider>
  );
};

export default App;
