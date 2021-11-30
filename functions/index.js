const firebaseConfig = require("./firebaseConfig");
const functions = firebaseConfig.functions;
const firestore = firebaseConfig.firestore;
const storageBucket = firebaseConfig.storageBucket;
const admin = firebaseConfig.admin;

exports.onCreateUser = functions.auth.user().onCreate((userRecord, context) => {
  const { email, uid } = userRecord;
  return firestore
    .collection("users")
    .doc(uid)
    .set({ email })
    .catch(console.error);
});

exports.onDeleteUser = functions.auth.user().onDelete((userRecord) => {
  const { uid } = userRecord;
  return firestore.collection("users").doc(uid).delete().catch(console.error);
});

console.log("CLOUD FUNCTIONS STARTED!");
