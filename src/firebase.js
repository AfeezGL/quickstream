import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq7HOQ_qK7Dq0yXKh2Zr3ToODZn8JO6Z0",
  authDomain: "quick-stream.firebaseapp.com",
  projectId: "quick-stream",
  storageBucket: "quick-stream.appspot.com",
  messagingSenderId: "889126539478",
  appId: "1:889126539478:web:4ea9b15514b27f2e357977",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, timeStamp };
export default db;
