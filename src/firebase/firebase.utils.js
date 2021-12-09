import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyDLGuDZDUU4enfCsPtypdOXgoIAGEZnHsM",
  authDomain: "crwn-db-fc0c5.firebaseapp.com",
  projectId: "crwn-db-fc0c5",
  storageBucket: "crwn-db-fc0c5.appspot.com",
  messagingSenderId: "599997455374",
  appId: "1:599997455374:web:0974e8fc6730483c1ef05f",
  measurementId: "${config.measurementId}"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); // is it necessary to include "firebase" here?
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
