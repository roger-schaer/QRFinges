// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
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
} from "firebase/auth";
import { CURRENT_USER_ID } from "../constant/contants";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_PROJECT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY || "",
  authDomain: FIREBASE_AUTH_DOMAIN || "",
  projectId: FIREBASE_PROJECT_ID || "",
  storageBucket: FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID || "",
  appId: FIREBASE_APP_ID || "",
  measurementId: FIREBASE_MEASUREMENT_ID || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const photoFirebaseStorage = ref(storage, "Photos");

export const handleSignup = async (email, password, name, firstname) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  console.log("user id:", user.user.uid);

  return setDoc(doc(firestore, "users", user.user.uid), {
    email: email,
    isAdmin: false,
    name: name,
    firstname: firstname,
  });
};

export const handleLogin = async (email, password) => {
  return /* await */ signInWithEmailAndPassword(auth, email, password);
};

export const handleSignOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.log(e);
  }
};

const CURRENT_WALK_RECORD = "custom-walk-id";

export const addRecordLocations = async (
  location,
  currentUser /* = CURRENT_USER_ID*/,
  currentWalkRecord = CURRENT_WALK_RECORD
) => {
  return /* await */ updateDoc(
    doc(firestore, "users", currentUser, "walkRecord", currentWalkRecord),
    {
      startDate: new Date(),
      locations: arrayUnion({ location }),
    }
  );
};

export const startRecordLocations = async (currentUser) => {
  return /* await */ addDoc(
    collection(firestore, "users", currentUser, "walkRecord"),
    {
      startDate: new Date(),
      endDate: null,
      locations: null,
    }
  );
};

export const stopRecordLocations = async (
  currentUser = CURRENT_USER_ID,
  currentWalkRecord = CURRENT_WALK_RECORD
) => {
  return /* await */ updateDoc(
    doc(firestore, "users", currentUser, "walkRecord", currentWalkRecord),
    {
      endDate: new Date(),
    }
  );
};

export const addRecordQRCode = async (currentUser, QRCode) => {
  return await addDoc(
    collection(firestore, "users", currentUser, "scannedQRCodes"),
    {
      QRCodeDate: new Date(),
      QRCode: arrayUnion({ QRCode }),
    }
  );
};

export const addImage = async (currentUser, imageStorageUri, date) => {
  return await addDoc(collection(firestore, "users", currentUser, "images"), {
    imageDate: date,
    imageId: imageStorageUri,
  });
};
