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
import { handleSignOut } from "../services/firebase";
import { useUserContext } from "../services/user-context";

const StackNav = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const drawerUrls = [
  {
    antIcon: "home",
    navigationScreen: HomeView,
    translateKey: "home",
    shouldBeLogged: false,
  },
  {
    antIcon: "contacts",
    navigationScreen: ContactPageView,
    translateKey: "contact",
    shouldBeLogged: false,
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: InfoNonRegisteredUserView,
    translateKey: "infoNonRegistered",
    shouldBeLogged: false,
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: InfoRegisteredUserView,
    translateKey: "infoRegistered",
    shouldBeLogged: false,
  },
  {
    antIcon: "infocirlceo",
    navigationScreen: CreateProfilePageView,
    translateKey: "subscribe",
    shouldBeLogged: false,
  },
  {
    antIcon: "profile",
    navigationScreen: ProfileView,
    translateKey: "profile",
    shouldBeLogged: false,
  },
  {
    antIcon: "qrcode",
    navigationScreen: QRcodeView,
    translateKey: "scanQR",
    shouldBeLogged: false,
  },
  {
    antIcon: "login",
    navigationScreen: LoginPageView,
    translateKey: "connect",
    shouldBeLogged: false,
  },
];

const CustomDrawerView = (props) => {
  const { state, dispatch } = useUserContext();

  const out = async () => {
    handleSignOut();
    dispatch({ type: "IS_LOGGED_OFF" });

    props.navigation.navigate("LoginPage");
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
        onPress={() => {}}
        label={() => (
          <View style={{ flexDirection: "row" }}>
            <Text>Language: {i18n.language}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={i18n.language == "fr" ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={i18n.language === "fr"}
              onChange={() => {
                i18n.changeLanguage(i18n.language == "fr" ? "en" : "fr");
              }}
            />
          </View>
        )}
      />
      {state.isLoggedIn && (
        <DrawerItem
          label={() => (
            <View style={{ flexDirection: "row" }}>
              <AntDesign name={"logout"} size={20} />
              <Text>{t("logout")}</Text>
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
  // const { state } = useUserContext();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerView {...props} />}
    >
      {drawerUrls.map((drawer) => (
        <>
          {/* {drawer.shouldBeLogged === true && state.isLoggedIn ? ( */}
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
          {/*  ) : null} */}
        </>
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
