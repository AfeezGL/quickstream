import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBRJm4K-6J_aq9REgJZy4AlxRsdGP1iCsc",
    authDomain: "quickstream.firebaseapp.com",
    projectId: "quickstream",
    storageBucket: "quickstream.appspot.com",
    messagingSenderId: "48297856016",
    appId: "1:48297856016:web:d1cd36e90e7d2ab9f94e95",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, timeStamp };
export default db;
