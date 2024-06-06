import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { app } from "../firebase";
import { getDatabase, push, ref, set } from "firebase/database";

export const FirebaseAuth = getAuth(app);
const FirebaseDatabase = getDatabase(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then((value) => console.log("User signed up"))
      .catch((error) => console.log("Something went wrong with user sign up"));
  };

  const putData = (key, data) => {
    set(push(ref(FirebaseDatabase, key)), {
      fruitName: data.email,
      fruitDefinition: data.password,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        putData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
