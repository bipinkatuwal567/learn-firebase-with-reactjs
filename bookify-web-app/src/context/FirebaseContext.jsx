import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD59oddCz3qMtuviKSTHDHie6ULhjSoySg",
  authDomain: "bookify-web-app-d399b.firebaseapp.com",
  projectId: "bookify-web-app-d399b",
  storageBucket: "bookify-web-app-d399b.appspot.com",
  messagingSenderId: "864900848261",
  appId: "1:864900848261:web:103f8f9b917b168e2567ec",
};
const firebaseApp = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Auth
const auth = getAuth(firebaseApp);

// Google auth provider
const GoogleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        logInUserWithEmailAndPassword,
        logInWithGoogle,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
