import React from "react";
import "./src/services/i18n";
import "react-native-gesture-handler";
import { UserProvider } from "./src/services/user-context";

import NavWithMenu from "./src/component/Navigation";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <UserProvider>
      <NavWithMenu />
    </UserProvider>
  );
};

export default App;
