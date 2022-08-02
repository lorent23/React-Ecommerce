import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyCShBbEhbW4YAmfs346TSCJ4sGR4fUOjLs",
  authDomain: "crwn-db-ba356.firebaseapp.com",
  projectId: "crwn-db-ba356",
  storageBucket: "crwn-db-ba356.appspot.com",
  messagingSenderId: "893253719363",
  appId: "1:893253719363:web:8c844afdba0796b57e4bf6",
  measurementId: "G-VVQZJVXXMQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc('users/${userAuth.uid}');

  const snapShot = userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date ();

    try {
      await userRef.set ({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch (error) {
      console.log('error creating user', error.message);
    }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;