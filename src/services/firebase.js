// Import the functions you need from the SDKs you need
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  initializeAuth,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { FIREBASE_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FIREBASE_STORAGE_PHOTOS_FOLDER,
  FIRESTORE_COMMENTS_KEY,
  FIRESTORE_PHOTOS_KEY,
  FIRESTORE_POIS_KEY,
  FIRESTORE_USERS_KEY,
  FIRESTORE_VISITED_POIS_KEY,
  FIRESTORE_WALK_HISTORY_KEY,
} from "../constant/constants";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectID,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    console.log("Firebase Auth is already initialized!");
    return getAuth(app);
  }
})();
export const storage = getStorage(app);
export const photoFirebaseStorage = ref(
  storage,
  FIREBASE_STORAGE_PHOTOS_FOLDER
);

export const handleSignup = async (email, password, firstName, lastName) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  console.log("user id:", user.user.uid);

  await setDoc(doc(firestore, FIRESTORE_USERS_KEY, user.user.uid), {
    email: email,
    isAdmin: false,
    firstName: firstName,
    lastName: lastName,
  });

  return user;
};

export const handleLogin = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const handleSignOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.error(e);
  }
};

export const addWalkLocations = async (location, currentUser, currentWalk) => {
  return /* await */ updateDoc(
    doc(
      firestore,
      FIRESTORE_USERS_KEY,
      currentUser,
      FIRESTORE_WALK_HISTORY_KEY,
      currentWalk
    ),
    {
      locations: arrayUnion({ location }),
    }
  );
};

export const startRecordLocations = async (currentUser) => {
  return /* await */ addDoc(
    collection(
      firestore,
      FIRESTORE_USERS_KEY,
      currentUser,
      FIRESTORE_WALK_HISTORY_KEY
    ),
    {
      startDate: new Date(),
      endDate: null,
      locations: null,
    }
  );
};

export const addComment = async (currentUser, comment, location) => {
  return addDoc(
    collection(
      firestore,
      FIRESTORE_USERS_KEY,
      currentUser,
      FIRESTORE_COMMENTS_KEY
    ),
    {
      date: new Date(),
      location: location,
      comment: comment,
    }
  );
};

export const stopRecordLocations = async (currentUser, currentWalk) => {
  return await updateDoc(
    doc(
      firestore,
      FIRESTORE_USERS_KEY,
      currentUser,
      FIRESTORE_WALK_HISTORY_KEY,
      currentWalk
    ),
    {
      endDate: new Date(),
    }
  );
};

export const addVisitedPoi = async (currentUser, poiId) => {
  return await addDoc(
    collection(
      firestore,
      FIRESTORE_USERS_KEY,
      currentUser,
      FIRESTORE_VISITED_POIS_KEY
    ),
    {
      poiId: poiId,
      date: new Date(),
    }
  );
};

export const addImageToUser = async (currentUser, imageURL, date, location) => {
  return await addDoc(
    collection(
      firestore,
      FIRESTORE_USERS_KEY,
      currentUser,
      FIRESTORE_PHOTOS_KEY
    ),
    {
      date: date,
      location: location,
      imageURL: imageURL,
    }
  );
};

export const findPoiByUrl = async (url) => {
  const q = query(
    collection(firestore, FIRESTORE_POIS_KEY),
    where("url", "==", url)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    let poi = querySnapshot.docs[0];
    return poi.id;
  }

  return null;
};
