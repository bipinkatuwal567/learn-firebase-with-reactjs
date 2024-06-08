import { initializeApp } from "firebase/app";
import { createContext } from "react";
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

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};

