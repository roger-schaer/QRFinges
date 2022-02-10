import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContactPageView from "../views/ContactPageView";
import FAQView from "../views/FAQView";
import QRcodeView from "../views/QRcodePageView";
import CreateProfilePageView from "../views/CreateProfilePageView";
import HomeView from "../views/HomeView";
import WebViewer from "../views/InternWebViewer";
import CameraView from "../views/PhotoView";
import UserCommentView from "../views/UserCommentView";
import { styles } from "./styles";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { handleSignOut } from "../services/firebase";
import { useUserContext } from "../services/user-context";
import {
  CONTACT_KEY,
  FAQ_KEY,
  HOME_KEY,
  QR_CODE_KEY,
  SUBSCRIBE_KEY,
  WEBVIEW_KEY,
  PHOTO_KEY,
  USER_COMMENT,
  LOCALSTORAGE_USER_ID,
  LOCALSTORAGE_USER_EMAIL,
} from "../constant/constants";
import { useNavigation } from "@react-navigation/native";
import { setStorageData } from "../services/storage";

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
    pageKey: FAQ_KEY,

    navigationScreen: FAQView,
    translateKey: "faq",
    displayWhenLogged: true,
    displayWhenNotLogged: true,
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
    antIcon: "camera",
    pageKey: PHOTO_KEY,

    navigationScreen: CameraView,
    translateKey: "camera",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
  {
    antIcon: "filetext1",
    pageKey: USER_COMMENT,

    navigationScreen: UserCommentView,
    translateKey: "comments",
    displayWhenLogged: true,
    displayWhenNotLogged: false,
  },
];

function BackButton() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.canGoBack() && (
        <AntDesign
          style={styles.iconContainer}
          name={"arrowleft"}
          size={25}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
    </>
  );
}

function HamburgerMenu() {
  const navigation = useNavigation();

  return (
    <MaterialIcons
      style={styles.iconContainer}
      name={"menu"}
      size={25}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const CustomDrawerView = (props) => {
  const { state, dispatch } = useUserContext();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const out = async () => {
    await handleSignOut();

    setStorageData(LOCALSTORAGE_USER_ID);
    setStorageData(LOCALSTORAGE_USER_EMAIL);

    dispatch({ type: "IS_LOGGED_OFF" });
    navigation.navigate(HOME_KEY);
  };

  const logout = async (e) => {
    e.preventDefault();
    await out();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        onPress={() => null}
        label={() => (
          <View style={{ flexDirection: "row" }}>
            {["EN", "FR"].map((l) => (
              <View key={`drawer-item-language-link-${l}`}>
                <Text
                  style={styles.textMenu}
                  onPress={async () => {
                    await i18n.changeLanguage(l);
                  }}
                >
                  {i18n.language === l && (
                    <Text style={styles.languageUnderline}>
                      {l.toUpperCase()}
                    </Text>
                  )}
                  {i18n.language !== l && l.toUpperCase()}
                </Text>
              </View>
            ))}
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
          onPress={async (event) => {
            await logout(event);
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

const OverMenu = () => {
  const { t } = useTranslation();
  const { state } = useUserContext();
  const isDrawerButtonDisplayed = (drawer) => {
    return (
      (drawer.displayWhenLogged || drawer.displayWhenNotLogged) &&
      (drawer.displayWhenLogged === state.isLoggedIn ||
        drawer.displayWhenNotLogged === !state.isLoggedIn)
    );
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerView {...props} />}
      screenOptions={{
        headerShown: true,
        headerLeft: () => <HamburgerMenu />,
      }}
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
