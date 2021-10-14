import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SideMenu from "./SideMenu";
import { Profile } from "./Profile";

const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Profile">
        {SideMenu.map((drawer) => (
          <Drawer.Screen key={drawer.name} name={drawer.name} children={null} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
