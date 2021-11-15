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

const StackNav = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerView = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
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
        )}
      />
    </DrawerContentScrollView>
  );
};

function OverMenu() {
  const { t, i18n } = useTranslation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerView {...props} />}
      screenOptions={(props) => ({
          tabBarIcon: (props) => {
              const icons = {
                  home: "home",
                  ProfileView: 'profile',
              };

              return (
                  <AntDesign
                      name={icons[props.name()]}
                      style={styles.iconContainer}
                      size={30}
                  />
              );
          },
          title: (props) => {
              return ( <Text style={styles.textMenu}/>);
          }
      })}
    >
      <Drawer.Screen name="home" component={HomeView} screenOptions={{tabBarIcon : "home", title : t("home")}}/>
      <Drawer.Screen
        name="infoRegistered"
        component={InfoRegisteredUserView} options={{title :t("infoRegistered") }}
      />
      <StackNav.Screen
        name="infoNonRegistered"
        component={InfoNonRegisteredUserView} options={{title :t("infoNonRegistered") }}
      />
      <Drawer.Screen name="contact" component={ContactPageView} options={{title: t("contact")}}/>
      <StackNav.Screen name="LoginPage" component={LoginPageView} options={{title: t("connect")}}/>
      <StackNav.Screen name="subscribe" component={CreateProfilePageView} options={{title: t("subscribe"), tabBarIcon: 'profile'}} />
      <StackNav.Screen name="Profile" component={ProfileView} options={{title: t("profile")}} />
      <StackNav.Screen name="QRcodePage" component={QRcodeView} options={{title: t("scanQR")}} />

    </Drawer.Navigator>
  );
}


const NavWithMenu = () => {
  return (
    <NavigationContainer>
      <OverMenu />
    </NavigationContainer>
  );
};

export default NavWithMenu;
