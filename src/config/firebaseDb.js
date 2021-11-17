/* import firebase from "firebase";
import firestore from "firebase/firestore";
// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxRai_FOigXVA6ugs-4fk1oA4RKDh3Nlw",
  databaseURL: "https://qrfinges.firebaseio.com",
  projectId: "qrfinges",
  storageBucket: "qrfinges.appspot.com",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export const firebaseDb = firebase;
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
