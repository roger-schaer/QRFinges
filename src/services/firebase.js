import { firebaseDb } from "../config/firebaseDb";
import { CURRENT_USER_ID } from "../constant/contants";

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
export const startRecordLocations = async (currentUser = CURRENT_USER_ID) => {
  return await getCollection("users")
    .doc(currentUser)
    .collection("walkRecord")
    .add({ startDate: new Date(), endDate: null, locations: [] });
};
export const addLocationToCurrentWalkRecord = (
  currentDoc,
  location,
  currentUser = CURRENT_USER_ID
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
