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
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKKBamDhPsS4DBxZ_Na1aCWybXwLPthPU",
  authDomain: "qrfinges.firebaseapp.com",
  projectId: "qrfinges",
  storageBucket: "qrfinges.appspot.com",
  messagingSenderId: "492229251310",
  appId: "1:492229251310:web:3e07d76e9814bf090123ff",
  measurementId: "G-MYBSS7VS0G",
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
    console.log(e);
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

export const addUserText = async (currentUser, userText) => {
  return await addDoc(
    collection(firestore, "users", currentUser, "userTexts"),
    {
      date: new Date(),
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

export const addImageToUser = async (currentUser, imageStorageUri) => {
  return await addDoc(collection(firestore, "users", currentUser, "images"), {
    imageDate: new Date(),
    imageId: imageStorageUri,
  });
};
export const qrcodeInFirebase = async (url) => {
  const q = query(collection(firestore, "qrcodes"), where("url", "==", url));

  const querySnapshot = await getDocs(q);
  return querySnapshot.size >= 1;
  /* .then(querySnapshot => {
    querySnapshot.size
    console.log(querySnapshot.size);
    console.log(doc.id, " => ", doc.data());
  }); */
};
