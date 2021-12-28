import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, collection, getDoc, setDoc, getDocFromCache } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
export { onSnapshot } from 'firebase/firestore';
export { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyDLGuDZDUU4enfCsPtypdOXgoIAGEZnHsM",
  authDomain: "crwn-db-fc0c5.firebaseapp.com",
  projectId: "crwn-db-fc0c5",
  storageBucket: "crwn-db-fc0c5.appspot.com",
  messagingSenderId: "599997455374",
  appId: "1:599997455374:web:0974e8fc6730483c1ef05f",
  measurementId: "${config.measurementId}"
}


initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // Checking if the authenticated user already exists in our database
  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
  // To get all the users - this is just a practice, it has nothing to do with the actual project
  // const colRef = collection(firestore, 'users');
  // const colRefSnap = await getDocs(colRef);
  // const docsSnap = colRefSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  // console.log(docsSnap);

}
const provider = new GoogleAuthProvider(); // is it necessary to include "firebase" here?
provider.setCustomParameters({
  prompt: 'select_account' // disable automatic logging
})
export const signInWithGoogle = () => signInWithPopup(auth, provider);
// export default firebase;
