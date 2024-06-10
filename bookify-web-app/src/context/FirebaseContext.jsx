import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
// Auth
const auth = getAuth(firebaseApp);
// Google auth provider
const GoogleProvider = new GoogleAuthProvider();
// Firestore
const firestoreDb = getFirestore(firebaseApp);
// Storage
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

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

  const handleCreateNewListing = async (
    bookName,
    isbnNumber,
    bookPrice,
    bookImage
  ) => {
    const bookImageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${bookImage.name}`
    );
    const uploadResult = await uploadBytes(bookImageRef, bookImage);

    return await addDoc(collection(firestoreDb, "books"), {
      bookName,
      isbnNumber,
      bookPrice,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userDisplayName: user.displayName,
      userEmail: user.email,
      userPhotoURL: user.photoURL,
    });
  };

  const fetchBookList = () => {
    return getDocs(collection(firestoreDb, "books"));
  };

  const getImageURL = async (url) => {
    return await getDownloadURL(ref(storage, url));
  };

  // Single book fetch
  const getBook = (bookId) => {
    return getDoc(doc(firestoreDb, "books", bookId));
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestoreDb, "books", bookId, "order");
    const result = await addDoc(collectionRef, {
      userId: user.uid,
      userDisplayName: user.displayName,
      userEmail: user.email,
      userPhotoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  const orderList = async (bookId) => {
    const docSnap = await getDocs(collection(firestoreDb, "books", bookId, "order"))
    return docSnap;
  }

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        logInUserWithEmailAndPassword,
        logInWithGoogle,
        handleCreateNewListing,
        fetchBookList,
        getImageURL,
        getBook,
        placeOrder,
        orderList,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
