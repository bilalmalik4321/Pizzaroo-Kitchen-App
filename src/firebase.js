import * as firebase from "firebase/app";
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const production = {
  apiKey: "AIzaSyClHlxPnGTOQCsrnO_TOjhY8m5KI3JkBVY",
  authDomain: "pizzaroo-34b58.firebaseapp.com",
  databaseURL: "https://pizzaroo-34b58.firebaseio.com",
  projectId: "pizzaroo-34b58",
  storageBucket: "pizzaroo-34b58.appspot.com",
  messagingSenderId: "718891977867",
  appId: "1:718891977867:web:e64de6afc9ed0f4ae6588e",
  measurementId: "G-WQ8CRGEKW3"
};

const development = {
  apiKey: "AIzaSyCoF9_EHc17iiP4BbF9Eb6M9mJaBHbtEG0",
  authDomain: "pizzaro-staging.firebaseio.com",
  databaseURL: "https://pizzaro-staging.firebaseio.com",
  projectId: "pizzaro-staging",
  storageBucket: "pizzaro-staging.appspot.com",
  messagingSenderId: "517159839848",
  appId: "1:517159839848:web:a7208f0ebebefc9717b3dd",
  measurementId: "G-HD6MZV0280",
};

const subdomain = window.location.hostname.split('.')[0];

let config = development;

if( subdomain === 'www') config = production;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

export default firebase;
