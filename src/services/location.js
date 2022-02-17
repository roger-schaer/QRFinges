import * as Location from "expo-location";

export const getCurrentPosition = async () => {
  let location;
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status === "granted") {
    console.log("foreground permission granted");
  } else {
    return {};
  }

  try {
    location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};
