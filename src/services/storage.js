import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

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
