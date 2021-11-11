import firebase from "firebase";
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
