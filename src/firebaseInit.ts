import firebase from "firebase";
import "firebase/firestore";

import { firebaseConfig } from "./config";

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export { app, db };
