import React from "react";
import "./src/services/i18n";
import "react-native-gesture-handler";
import { UserProvider } from "./src/services/user-context";
import "react-native-gesture-handler";

import NavWithMenu from "./src/component/Navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavWithMenu />
    </UserProvider>
  );
};

export default App;
