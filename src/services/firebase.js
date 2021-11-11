import { firebaseDb } from "../config/firebaseDb";

const getCollection = (key, currentRef = null) => {
  if (currentRef) {
    return currentRef.collection(key);
  } else {
    return firebaseDb.firestore().collection(key);
  }
};

export const getUsers = async () => {
  return await getCollection("users").get();
};

export const getUserScannedQrCodes = (ref) => {
  return getCollection("scannedQrCodes", ref);
};
export const startRecordLocations = async (
  currentUser = "SGH0SGAqsdcvRttub8WXRWc4eKu1"
) => {
  return await getCollection("users")
    .doc(currentUser)
    .collection("walkRecord")
    .add({ startDate: new Date(), endDate: null, locations: [] });
};
export const addLocationToCurrentWalkRecord = (
  currentDoc,
  location,
  currentUser = "SGH0SGAqsdcvRttub8WXRWc4eKu1"
) => {
  console.log(currentDoc, location);
  getCollection("users")
    .doc(currentUser)
    .collection("walkRecord")
    .doc(currentDoc)
    .update({
      locations: firebaseDb.firestore.FieldValue.arrayUnion(location),
    });
};
