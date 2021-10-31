import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SideMenu from "./SideMenu";

import Home from "../views/HomeView";
import { Profile } from "../pages/Profile";
import LocationRecordingView from "../views/LocationRecordingView";
import SignIn from "../views/SignInView";
import SignUp from "../views/SignUpView";


 const StackNav = createNativeStackNavigator();

// const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator>
        {/* { isLoggedIn ? (
          // Screens for logged in users 
          <StackNav.Group>
            <StackNav.Screen name="Home" component={Home} />
            {/* <StackNav.Screen name="Location" component={LocationRecordingView} /> */}
            {/* <StackNav.Screen name="Profile" component={Profile} />
          </StackNav.Group> */}
        {/* ) : ( */} 
          {/* // Auth screens */}
          {/* <StackNav.Group /*screenOptions={{ headerShown: false }} > */}
          <StackNav.Screen name="SignIn" component={SignIn}/>
            <StackNav.Screen name="SignUp" component={SignUp} />
            <StackNav.Screen name="Home" component={Home} />
            {/* <StackNav.Screen name="Location" component={LocationRecordingView} /> */}
            <StackNav.Screen name="Profile" component={Profile} />
            
          {/* </StackNav.Group> */}
        {/* )} */}
        {/* Common modal screens */}
        {/* <StackNav.Group screenOptions={{ presentation: 'modal' }}>
        <StackNav.Screen name="Help" component={Help} />
        <StackNav.Screen name="Invite" component={Invite} />
        </StackNav.Group> */}
      </StackNav.Navigator>
//     </NavigationContainer>
  );
};

 export default Navigation;