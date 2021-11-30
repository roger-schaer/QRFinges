import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
export const firebaseDb = getFirestore(app);
export const auth = getAuth(app);
