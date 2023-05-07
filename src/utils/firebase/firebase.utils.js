// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Tp1urU6OrSK04C1oJRMzRpHljANgEF4",
  authDomain: "crwn-clothing-ed6cf.firebaseapp.com",
  projectId: "crwn-clothing-ed6cf",
  storageBucket: "crwn-clothing-ed6cf.appspot.com",
  messagingSenderId: "214000223898",
  appId: "1:214000223898:web:9463387d4bfe5763094123",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Provider for Google Auth
const provider = new GoogleAuthProvider();

// Google Auth provider params
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
};
