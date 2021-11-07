import React from "react";
import "./src/services/i18n";
import {
  NavigationContainer,
  createNativeStackNavigator,
} from "@react-navigation/native";

import { Navigation } from "./src/component/Navigation";
import Profile from "./src/pages/Profile";

const App = () => {
  return (
    <Navigation />
  );
};

export default App;

