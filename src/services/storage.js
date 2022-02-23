import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications'

export const setStorageData = (key, value) => {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    value ? AsyncStorage.setItem(key, value) : AsyncStorage.removeItem(key);
  }
};

export const getStorageData = async (key) => {
  if (Platform.OS === "web") {
    return new Promise(() => localStorage.getItem(key));
  } else {
    return AsyncStorage.getItem(key);
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function notifyArrival() {
  console.log("Notifying of arrival!");


  const content = {
    title: "Tracking toujours actif",
    body: "Nous avons pris l'initiative d'enlever le tracking car vous n'êtes plus dans la zone définie par l'applicaiton.",
    data: { tracking: "tracking" },
    color: "#76B729",
  };

  await Notifications.scheduleNotificationAsync({
    content,
    trigger: null,
  });
}