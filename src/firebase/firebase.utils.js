import { initializeApp } from 'firebase/app';
import { getFirestore, doc, addDoc, getDoc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
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
  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const collectionRef = collection(firestore, 'users');
  const snapShot = await getDoc(userRef);
  const collectionSnapShot = await getDocs(collectionRef);
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
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  console.log(collectionRef);
  const batch = writeBatch(firestore);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collection(firestore, collectionKey));
    batch.set(newDocRef, obj)
  })
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    console.log(doc.data());
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })
  const obj = {};
  transformedCollection.forEach(collection => obj[collection.routeName] = collection)
  return obj;
  // I had to convert the resultant array into an object because according to the course
  // I have to reference the items in it by url param i.e. a string (sneakers, hats, jackets... etc)
  // which is really wierd bc this is an array, you cannot reference the items by string but by an numeric index
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const googleProvider = new GoogleAuthProvider(); // is it necessary to include "firebase" here?
googleProvider.setCustomParameters({
  prompt: 'select_account' // disable automatic logging
})

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// export default firebase;
