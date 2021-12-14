import * as Location from "expo-location";
import { BACKGROUND_LOCATION_UPDATES_TASK } from "../constant/contants";

export const requestForegroundPermissions = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("foreground permission", status);
    if (status !== "granted") {
      console.log("Permission to foreground location was denied");
      return;
    }
  } catch (e) {
    console.log("error with foreground permissions");
  }
};

export const requestBackgroundPermissions = async () => {
  try {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status === "granted") {
      console.log("background permission granted");
    }
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 8000,
      distanceInterval: 1,
    });
  } catch (e) {
    console.log("error with background permissions");
  }
};

export const GetInstantLocation = async () => {
  let location;
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status === "granted") {
    console.log("background permission granted");
  }
  try {
    location = await Location.getCurrentPositionAsync({});
    return { latitude: location.coords.latitude, longitude: location.coords.longitude };
  } catch (e) {
    console.log(e);
    return {};
  }
};
