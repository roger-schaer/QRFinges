import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

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

export async function notifyForestExist() {
  // TODO - This text should also be localized, this is linked to the following task : https://trello.com/c/UxnhZLzu
  const content = {
    title: "Arrêt du tracking",
    body: "Nous avons pris l'initiative d'arrêter le tracking car vous n'êtes plus dans la zone définie par l'applicaiton.",
    data: { tracking: "tracking" },
    color: "#76B729",
  };

  await Notifications.scheduleNotificationAsync({
    content,
    trigger: null,
  });
}

export function isInForest(latitude, longitude) {
  // Define min/max latitude & longitude values of the forest area
  const minLat = 46.3113;
  const maxLat = 46.3119;

  const minLng = 7.5696;
  const maxLng = 7.57;

  // Check if the current latitude & longitude fall within the forest area rectangle
  if (
    latitude >= minLat &&
    latitude <= maxLat &&
    longitude >= minLng &&
    longitude <= maxLng
  )
    return true;

  return false;
}
