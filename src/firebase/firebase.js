import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoF9_EHc17iiP4BbF9Eb6M9mJaBHbtEG0",
    authDomain: "pizzaro-staging.firebaseapp.com",
    databaseURL: "https://pizzaro-staging.firebaseio.com",
    projectId: "pizzaro-staging",
    storageBucket: "pizzaro-staging.appspot.com",
    messagingSenderId: "517159839848",
    appId: "1:517159839848:web:a7208f0ebebefc9717b3dd",
    measurementId: "G-HD6MZV0280"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
