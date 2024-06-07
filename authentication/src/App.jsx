import React from "react";
import "./App.css";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./firebase";
import { query } from "firebase/database";

const firestoreDB = getFirestore(app);

const App = () => {
  const putDataInFireStore = async () => {
    try {
      const docRef = await addDoc(collection(firestoreDB, "cities"), {
        cityName: "Kathmandu",
        postalCode: 56738,
        lat: 123,
        long: 456,
      });
      console.log(docRef);
    } catch (e) {
      console.log("Error adding document", e);
    }
  };

  const putSubDataInFireStore = async () => {
    try {
      const docRef = await addDoc(
        collection(firestoreDB, "cities/Ulu2rlgn8UCTiX2Oqsgu/places"),
        {
          placeName: "Falano",
          placeDesc: "Awesome place",
          placeCreated: Date.now(),
        }
      );
      console.log(docRef);
    } catch (e) {
      console.log("Error adding sub document", e);
    }
  };

  const getData = async () => {
    const docRef = doc(firestoreDB, "users", "KaBtXG1o3pknTN94Om3I");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const getDocumentsData = async () => {
    const docRef = collection(firestoreDB, "users");
    const q = query(docRef, where("isMale", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((data) => {
      console.log(data.data());
    });
  };

  const updateDocumentData = async () => {
    const docRef = doc(firestoreDB, "cities", "Ulu2rlgn8UCTiX2Oqsgu");
    await updateDoc(docRef, {
        cityName: "KTM"
    });
  };
  return (
    <div className="app" style={{ flexDirection: "column", gap: "1rem" }}>
      <h2>Firebase FireStore</h2>
      <button onClick={putDataInFireStore}>ADD DATA</button>
      <button onClick={putSubDataInFireStore}>ADD SUB DATA</button>
      <button onClick={getData}>GET DATA</button>
      <button onClick={getDocumentsData}>GET DATA USING QUERY</button>
      <button onClick={updateDocumentData}>UPDATE DATA</button>
    </div>
  );
};

export default App;
