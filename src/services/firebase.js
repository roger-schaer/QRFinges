// Import the functions you need from the SDKs you need

import {initializeApp} from 'firebase/app';
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKKBamDhPsS4DBxZ_Na1aCWybXwLPthPU",
    authDomain: "qrfinges.firebaseapp.com",
    projectId: "qrfinges",
    storageBucket: "qrfinges.appspot.com",
    messagingSenderId: "492229251310",
    appId: "1:492229251310:web:3e07d76e9814bf090123ff",
    measurementId: "G-MYBSS7VS0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);


export const handleSignup = async (email, password, name, firstname) => {

    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log('user id:', user.user.uid)

    return setDoc(doc(firestore, "users", user.user.uid), {
        email: email,
        isAdmin: false,
        name: name,
        firstname: firstname,
    });

}

export const handleLogin = async (email, password) => {

    return await signInWithEmailAndPassword(auth, email, password)

}


export const handleSignOut = async () => {

    try {
        await auth.signOut();
    } catch (e){
        console.log(e);
    }

}


