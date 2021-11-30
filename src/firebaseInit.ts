import firebase from "firebase";
import "firebase/firestore";

import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
