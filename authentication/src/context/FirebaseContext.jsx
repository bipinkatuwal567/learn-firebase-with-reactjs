import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase";
import { child, get, getDatabase, onValue, push, ref, set } from "firebase/database";

export const FirebaseAuth = getAuth(app);
const FirebaseDatabase = getDatabase(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [name, setName] = useState("")

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

  const putDataNew = (key, data) => {
    set(ref(FirebaseDatabase, key), data);
  };

  get(child(ref(FirebaseDatabase), "grandfather/father/child")).then((snapshot) =>
    console.log(snapshot.val())
  );

  useEffect(() => {
    onValue(ref(FirebaseDatabase, 'grandfather/father/child'), (snapshot) => {
      setName(snapshot.val().name)
    })
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        putData,
        putDataNew,
      }}
    >
      <h2>My name is {name}</h2>
      {props.children}
    </FirebaseContext.Provider>
  );
};
