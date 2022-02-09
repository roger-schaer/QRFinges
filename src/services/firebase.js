// Import the functions you need from the SDKs you need
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
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
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
export const photoFirebaseStorage = ref(storage, "Photos");

export const handleSignup = async (email, password, name, firstname) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  console.log("user id:", user.user.uid);

  setDoc(doc(firestore, "users", user.user.uid), {
    email: email,
    isAdmin: false,
    name: name,
    firstname: firstname,
  });
  return user;
};

export const handleLogin = async (email, password) => {
  return /* await */ signInWithEmailAndPassword(auth, email, password);
};

export const handleSignOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.error(e);
  }
};

export const addRecordLocations = async (
  location,
  currentUser,
  currentWalkRecord
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

export const addUserText = async (currentUser, userText, location) => {
  console.log("location", location);
  return await addDoc(
    collection(firestore, "users", currentUser, "userTexts"),
    {
      textDate: new Date(),
      textLocation: location,
      userText: userText,
    }
  );
};

export const stopRecordLocations = async (currentUser, currentWalkRecord) => {
  return await updateDoc(
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
      QRCodeUrl: QRCode,
    }
  );
};

export const addImageToUser = async (
  currentUser,
  imageStorageUri,
  date,
  location
) => {
  return await addDoc(collection(firestore, "users", currentUser, "images"), {
    imageDate: date,
    ImageLocation: location,
    imageId: imageStorageUri,
  });
};
export const qrcodeInFirebase = async (url) => {
  const q = query(collection(firestore, "qrcodes"), where("url", "==", url));

  const querySnapshot = await getDocs(q);
  return querySnapshot.size >= 1;
};
