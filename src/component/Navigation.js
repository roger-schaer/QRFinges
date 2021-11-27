import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import InfoRegisteredUserView from "../views/InfoRegisteredUserView";
import ProfileView from "../views/ProfileView";
import ContactPageView from "../views/ContactPageView";
import InfoNonRegisteredUserView from "../views/InfoNonRegisteredUserView";
import LoginPageView from "../views/LogInPageView";
import QRcodeView from "../views/QRcodePageView";
import CreateProfilePageView from "../views/CreateProfilePageView";
import HomeView from "../views/HomeView";
import WebViewer from "../views/InternWebViewer";
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
import { handleSignOut } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import CameraView from "../views/PhotoView";

const Drawer = createDrawerNavigator();

const drawerUrls = [
  {
    antIcon: "home",
    navigationScreen: HomeView,
    translateKey: "home",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "contacts",
    navigationScreen: ContactPageView,
    translateKey: "contacts",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: InfoNonRegisteredUserView,
    translateKey: "infoNonRegistered",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: InfoRegisteredUserView,
    translateKey: "infoRegistered",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: CreateProfilePageView,
    translateKey: "subscribe",
    displayWhenLogged: false,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "profile",
    navigationScreen: ProfileView,
    translateKey: "mainPage",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "webViewer",
    navigationScreen: WebViewer,
    translateKey: "webViewer",
    displayWhenLogged: false,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "qrcode",
    navigationScreen: QRcodeView,
    translateKey: "scanQR",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
    unmountOnBlur: true,
  },
  {
    antIcon: "login",
    navigationScreen: LoginPageView,
    translateKey: "connect",
    displayWhenLogged: false,
    displayWhenNotLogged: true,
  },
];

const CustomDrawerView = (props) => {
  const { state, dispatch } = useUserContext();

  const out = async () => {
    handleSignOut();

    dispatch({ type: "IS_LOGGED_OFF" });
    props.navigation.navigate("connect");
  };

  const logout = (e) => {
    e.preventDefault();
    out();
  };

  const { t, i18n } = useTranslation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        onPress={() => {
          i18n.changeLanguage(i18n.language == "FR" ? "EN" : "FR");
        }}
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
        )}
      />
      {state.isLoggedIn && (
        <DrawerItem
          label={() => (
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <AntDesign
                  // @ts-ignore
                  name={"logout"}
                  style={styles.iconContainer}
                  size={15}
                />
                <Text style={styles.textMenu}>{t("logout")}</Text>
              </View>
            </View>
          )}
          onPress={(event) => {
            logout(event);
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

const OverMenu = () => {
  const { t, i18n } = useTranslation();
  const { state } = useUserContext();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerView {...props} />}
      screenOptions={{ headerShown: true }}
    >
      {drawerUrls.map((drawer) => (
        <Drawer.Screen
          key={`drawer-button-${drawer.translateKey}`}
          name={drawer.translateKey}
          component={drawer.navigationScreen}
          options={{
            drawerItemStyle: {
              display:
                drawer.displayWhenLogged == state.isLoggedIn ||
                drawer.displayWhenNotLogged == !state.isLoggedIn
                  ? "flex"
                  : "none",
            },
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

const NavWithMenu = () => {
  return (
    <NavigationContainer>
      <OverMenu />
    </NavigationContainer>
  );
};

export default NavWithMenu;
