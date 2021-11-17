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
import { Switch, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

const StackNav = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const drawerUrls = [
  { antIcon: "home", navigationScreen: HomeView, translateKey: "home" },
  {
    antIcon: "contacts",
    navigationScreen: ContactPageView,
    translateKey: "contact",
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: InfoNonRegisteredUserView,
    translateKey: "infoNonRegistered",
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: InfoRegisteredUserView,
    translateKey: "infoRegistered",
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: CreateProfilePageView,
    translateKey: "subscribe",
  },
  {
    antIcon: "profile",
    navigationScreen: ProfileView,
    translateKey: "profile",
  },
  { antIcon: "qrcode", navigationScreen: QRcodeView, translateKey: "scanQR" },
  {
    antIcon: "logout",
    navigationScreen: LoginPageView,
    translateKey: "logout",
  },
  {
    antIcon: "login",
    navigationScreen: LoginPageView,
    translateKey: "connect",
  },
];

const CustomDrawerView = (props) => {
  const { i18n } = useTranslation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        onPress={() => {
          i18n.changeLanguage(i18n.language === "FR" ? "EN" : "FR");
        }}
        label={() => (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textMenu}>{i18n.language}</Text>
            <Switch
              trackColor={{ false: "#43a047", true: "#00695c" }}
              thumbColor={i18n.language == "FR" ? "#43a047" : "#00695c"}
              ios_backgroundColor="#3e3e3e"
              value={i18n.language == "FR"}
            />
          </View>
        )}
      />
    </DrawerContentScrollView>
  );
};

const OverMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerView {...props} />}
    >
      {drawerUrls.map((drawer) => (
        <Drawer.Screen
          key={`drawer-button-${drawer.translateKey}`}
          name={t(drawer.translateKey)}
          component={drawer.navigationScreen}
          options={{
            drawerLabel: () => (
              <View style={{ flexDirection: "row" }}>
                <AntDesign
                  // @ts-ignore
                  name={drawer.antIcon}
                  style={styles.iconContainer}
                  size={15}
                />
                <Text style={styles.textMenu}>{t(drawer.translateKey)}</Text>
              </View>
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="OverMenu"
      screenOptions={{ headerShown: false }}
    >
      <StackNav.Screen name="Home" component={HomeView} />
      <StackNav.Screen name="LoginPage" component={LoginPageView} />
      <StackNav.Screen name="CreateProfile" component={CreateProfilePageView} />
      <StackNav.Screen
        name="InfoNonRegisteredUser"
        component={InfoNonRegisteredUserView}
      />
      <StackNav.Screen name="Profile" component={ProfileView} />
      <StackNav.Screen name="QRcodePage" component={QRcodeView} />
      <StackNav.Screen
        name="InfoRegisteredUser"
        component={InfoRegisteredUserView}
      />
      <StackNav.Screen
        name="Contact"
        component={ContactPageView}
        screenOptions={{ headerShown: true }}
      />
      <StackNav.Screen
        name="OverMenu"
        component={OverMenu}
        screenOptions={{ headerShown: false }}
      />
    </StackNav.Navigator>
  );
};

const NavWithMenu = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default NavWithMenu;
