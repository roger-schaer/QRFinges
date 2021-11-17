import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfoRegisteredUserView from "../views/InfoRegisteredUserView";
import ProfileView from "../views/ProfileView";
import ContactPageView from "../views/ContactPageView";
import InfoNonRegisteredUserView from "../views/InfoNonRegisteredUserView";
import LoginPageView from "../views/LogInPageView";
import QRcodeView from "../views/QRcodePageView";
import CreateProfilePageView from "../views/CreateProfilePageView";
import HomeView from "../views/HomeView";
import { styles } from "../component/styles";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Switch, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import {createSwitchNavigator} from "react-navigation";
import { useNavigation } from '@react-navigation/native';
import {Logo} from "./Logo";
import Button from "react-native-web/dist/exports/Button";

const StackNav = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
/*const MainNavigation = createSwitchNavigator({
    Navigation : Navigation,
    TopMenu : OverMenu,
}); */

const CustomDrawerView = (props) => {
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
          label={() => (
              <View style={{ flexDirection: "row" }}>
                  <AntDesign name={"contacts"} style={styles.iconContainer} size={15}/>
                  <Text style={styles.textMenu}>{t("contact")}</Text>
              </View>
          )}
          onPress={() => navigation.navigate('Contact')}/>

      <DrawerItem
          label={() => (
              <View style={{ flexDirection: "row" }}>
                  <AntDesign name={"infocirlceo"} style={styles.iconContainer} size={15}/>
                  <Text style={styles.textMenu}>{t("infoNonRegistered")}</Text>
              </View>
          )}
          onPress={() => props.navigation.navigate('InfoNonRegisteredUser')}/>

        <DrawerItem
            label={() => (
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name={"infocirlceo"} style={styles.iconContainer} size={15}/>
                    <Text style={styles.textMenu}>{t("infoRegistered")}</Text>
                </View>
            )}
            onPress={() => props.navigation.navigate('InfoRegisteredUser')}/>

        <DrawerItem
            label={() => (
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name={"infocirlceo"} style={styles.iconContainer} size={15}/>
                    <Text style={styles.textMenu}>{t("subscribe")}</Text>
                </View>
            )}
            onPress={() => props.navigation.navigate('CreateProfile')}/>

        <DrawerItem
            label={() => (
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name={"profile"} style={styles.iconContainer} size={15}/>
                    <Text style={styles.textMenu}>{t("profile")}</Text>
                </View>
            )}
            onPress={() => props.navigation.navigate('Profile')}/>

        <DrawerItem
            label={() => (
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name={"qrcode"} style={styles.iconContainer} size={15}/>
                    <Text style={styles.textMenu}>{t("scanQR")}</Text>
                </View>
            )}
            onPress={() => props.navigation.navigate('QRcodePage')}/>

        <DrawerItem
        onPress={() => {}}
        label={() => (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textMenu}>{i18n.language}</Text>
            <Switch
              trackColor={{ false: "#43a047", true: "#00695c" }}
              thumbColor={i18n.language == "FR" ? "#43a047" : "#00695c"}
              ios_backgroundColor="#3e3e3e"
              value={i18n.language === "FR"}
              onChange={() => {
                i18n.changeLanguage(i18n.language == "FR" ? "EN" : "FR");
              }}
            />
          </View>
        )}/>
        <DrawerItem
            label={()=> (
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name={"logout"} style={styles.iconContainer} size={15}/>
                    <Text style={styles.textMenu}>{t("logout")}</Text>
                </View>
            )}
            onPress={() => {console.log("Logout function here")}}/>
        <DrawerItem
            label={()=> (
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name={"login"} style={styles.iconContainer} size={15}/>
                    <Text style={styles.textMenu}>{t("connect")}</Text>
                </View>
            )}
            onPress={() => props.navigation.navigate('LoginPage')}/>
    </DrawerContentScrollView>
  );
};

const OverMenu = () => {
  const { t, i18n } = useTranslation();
  return <Drawer.Navigator drawerContent={(props) => <CustomDrawerView {...props} />} >
      <Drawer.Screen name="Home" component={HomeView} screenOptions={{ title : t("home")}}/>
  </Drawer.Navigator>;
}

const Navigation = () => {

    return (
            <StackNav.Navigator initialRouteName="OverMenu" screenOptions = {{headerShown : false}} >
                <StackNav.Screen name="Home" component={HomeView}/>
                <StackNav.Screen name="LoginPage" component={LoginPageView}/>
                <StackNav.Screen name="CreateProfile" component={CreateProfilePageView} />
                <StackNav.Screen name="InfoNonRegisteredUser" component={ InfoNonRegisteredUserView }/>
                <StackNav.Screen name="Profile" component={ProfileView} />
                <StackNav.Screen name="QRcodePage" component={QRcodeView}/>
                <StackNav.Screen name="InfoRegisteredUser" component={InfoRegisteredUserView} />
                <StackNav.Screen name="Contact" component={ContactPageView} screenOptions={{headerShown : true}}/>
                <StackNav.Screen name="OverMenu" component={OverMenu} screenOptions = {{headerShown : false}}/>


            </StackNav.Navigator>
    );
};


const NavWithMenu = () => {
  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  );
};


export default NavWithMenu;
