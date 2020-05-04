import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// get firebase config from serviceAccount.js
// get the config from google console/setting/general
import config from "./serviceAccount";

firebase.initializeApp(config);

export default firebase;
