// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log(firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Provider for Google Auth
const googleProvider = new GoogleAuthProvider();
// Google Auth provider params
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const updateUserDetails = async (additionalInformation = {}) => {
  if (!auth.currentUser) return;

  try {
    return await updateProfile(auth.currentUser, { ...additionalInformation })
  } catch (err) {
    window.alert(err)
  }

}

export const createAuthUserWithEmailAndPassword = async (email, password, userName) => {
  if (!email || !password) return;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return await updateUserDetails({ displayName: userName })
  } catch (err) {
    console.log(err)
    window.alert(`There was an error creating user: ${err}`)
  }
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    window.alert(`Could not sign in with credentials: ${err}`)
  }
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
