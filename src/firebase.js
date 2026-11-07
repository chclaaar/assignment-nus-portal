import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMnCisKpShQMh5ifnP34Un2xIv890xFlc",
  authDomain: "tut-8-4bbe5.firebaseapp.com",
  projectId: "tut-8-4bbe5",
  storageBucket: "tut-8-4bbe5.firebasestorage.app",
  messagingSenderId: "131722978855",
  appId: "1:131722978855:web:0cde655f87b27ad8add002"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" }); // always show the account picker

// These throw on failure, so the page can show a clear notification
export const logInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = async (name, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  return user;
};

export const sendPasswordReset = (email) => sendPasswordResetEmail(auth, email);

export const logout = () => signOut(auth);
