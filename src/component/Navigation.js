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
import CameraView from "../views/PhotoView";
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
import {
  CONTACT_KEY,
  HOME_KEY,
  INFO_NOREGISTERED_KEY,
  INFO_REGISTERED_KEY,
  LOGIN_KEY,
  PROFILE_KEY,
  QR_CODE_KEY,
  SUBSCRIBE_KEY,
  WEBVIEW_KEY,
  PHOTO_KEY,
} from "../constant/contants";

const Drawer = createDrawerNavigator();

const drawerUrls = [
  {
    antIcon: "home",
    pageKey: HOME_KEY,
    navigationScreen: HomeView,
    translateKey: "home",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "contacts",
    pageKey: CONTACT_KEY,

    navigationScreen: ContactPageView,
    translateKey: "contact",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "infocirlceo",
    pageKey: INFO_NOREGISTERED_KEY,

    navigationScreen: InfoNonRegisteredUserView,
    translateKey: "infoNonRegistered",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "infocirlceo",
    pageKey: INFO_REGISTERED_KEY,

    navigationScreen: InfoRegisteredUserView,
    translateKey: "infoRegistered",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "infocirlceo",
    pageKey: SUBSCRIBE_KEY,

    navigationScreen: CreateProfilePageView,
    translateKey: "subscribe",
    displayWhenLogged: false,
    displayWhenNotLogged: true,
  },
  {
    antIcon: "profile",
    pageKey: PROFILE_KEY,

    navigationScreen: ProfileView,
    translateKey: "profile",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "webViewer",
    pageKey: WEBVIEW_KEY,

    navigationScreen: WebViewer,
    translateKey: "webViewer",
    displayWhenLogged: false,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "qrcode",
    pageKey: QR_CODE_KEY,

    navigationScreen: QRcodeView,
    translateKey: "scanQR",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "qrcode",
    pageKey: PHOTO_KEY,

    navigationScreen: CameraView,
    translateKey: "CameraView",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "login",
    pageKey: LOGIN_KEY,

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
    props.navigation.navigate(LOGIN_KEY);
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
  const isDrawerButtonDisplayed = (drawer) => {
    return (
      (drawer.displayWhenLogged || drawer.displayWhenNotLogged) &&
      (drawer.displayWhenLogged == state.isLoggedIn ||
        drawer.displayWhenNotLogged == !state.isLoggedIn)
    );
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerView {...props} />}
      screenOptions={{ headerShown: true }}
    >
      {drawerUrls.map((drawer) => (
        <Drawer.Screen
          key={`drawer-button-${drawer.translateKey}`}
          name={drawer.pageKey}
          component={drawer.navigationScreen}
          options={{
            drawerItemStyle: {
              display: isDrawerButtonDisplayed(drawer) ? "flex" : "none",
            },
            headerTitle: t(drawer.translateKey),
            drawerLabel: () =>
              isDrawerButtonDisplayed(drawer) ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    // @ts-ignore
                    name={drawer.antIcon}
                    style={styles.iconContainer}
                    size={15}
                  />
                  <Text style={styles.textMenu}>{t(drawer.translateKey)}</Text>
                </View>
              ) : null,
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
