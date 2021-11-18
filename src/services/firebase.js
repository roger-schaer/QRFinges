import { firebaseDb } from "../config/firebaseDb";
import { updateDoc, setDoc, doc, addDoc, arrayUnion, collection } from "firebase/firestore";
import { CURRENT_USER_ID } from "../constant/contants";
const CURRENT_WALK_RECORD = 'test-app';
const getCollection = (key, currentRef = null) => {
  if (currentRef) {
    return currentRef.collection(key);
  } else {
    return doc(firebaseDb, key);
  }
};

export const getUsers = async () => {
  return await getCollection("users").get();
};

export const getUserScannedQrCodes = (ref) => {
  return getCollection("scannedQrCodes", ref);
};
export const addRecordLocations = async (
  location,
  currentUser = CURRENT_USER_ID,
  currentWalkRecord = CURRENT_WALK_RECORD
) => {
  return await updateDoc(doc(firebaseDb, "users", currentUser, 'walkRecord', currentWalkRecord), {
    startDate: new Date(),
    locations: arrayUnion({location, random: Math.random()}),
  });
};

export const startRecordLocations = async (
  location,
  currentUser = CURRENT_USER_ID
) => {
  return await addDoc(collection(firebaseDb, "users", currentUser, 'walkRecord'), {
    startDate: new Date(),
    endDate: null,
    locations: [location],
  });
};

export const stopRecordLocations = async (
  currentUser = CURRENT_USER_ID,
  currentWalkRecord = CURRENT_WALK_RECORD
)  => {
  return await updateDoc(doc(firebaseDb, "users", currentUser, 'walkRecord', currentWalkRecord), {
    endDate: new Date()
  });
}
/* export const addLocationToCurrentWalkRecord = (
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
 */
