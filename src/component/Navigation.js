import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoRegisteredUserView from "../views/InfoRegisteredUserView";
import ProfileView from "../views/ProfileView";
import ContactPageView from "../views/ContactPageView";
import InfoNonRegisteredUserView from "../views/InfoNonRegisteredUserView";
import LoginPageView from "../views/LogInPageView";
import QRcodeView from "../views/QRcodePageView";
import CreateProfilePageView from "../views/CreateProfilePageView";
import HomeView from "../views/HomeView";
import HelpView from "../views/HelpView";
import { createDrawerNavigator } from '@react-navigation/drawer';


const StackNav = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function OverMenu() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeView} />
            <Drawer.Screen name="Info" component={InfoRegisteredUserView} />
            <Drawer.Screen name="Contact" component={ContactPageView}/>
            <StackNav.Screen name="LoginPage" component={LoginPageView}/>
            <StackNav.Screen name="CreateProfile" component={CreateProfilePageView} />
            <StackNav.Screen name="Profile" component={ProfileView} />
        </Drawer.Navigator>
    );
}


const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator>
        <StackNav.Screen name="Home" component={HomeView} />
        <StackNav.Screen name="LoginPage" component={LoginPageView}/>
        <StackNav.Screen name="CreateProfile" component={CreateProfilePageView} />
        <StackNav.Screen name="InfoNonRegisteredUser" component={ InfoNonRegisteredUserView }/>
        <StackNav.Screen name="Profile" component={ProfileView} />
        <StackNav.Screen name="QRcodePage" component={QRcodeView}/>
        <StackNav.Screen name="InfoRegisteredUser" component={InfoRegisteredUserView} />
        <StackNav.Screen name="Contact" component={ContactPageView}/>
        <StackNav.Screen name="Help" component={HelpView}/>
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

const NavWithMenu = () => {
    return (
        <NavigationContainer>
            <OverMenu/>
        </NavigationContainer>
    );
};


 export default NavWithMenu;