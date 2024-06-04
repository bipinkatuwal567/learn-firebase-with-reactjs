// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYbWM53tyqBEkijGXDf-_68pIxMBLexmo",
  authDomain: "learn-react-firebase-df763.firebaseapp.com",
  databaseURL: "https://learn-react-firebase-df763-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learn-react-firebase-df763",
  storageBucket: "learn-react-firebase-df763.appspot.com",
  messagingSenderId: "980559508248",
  appId: "1:980559508248:web:8e3bea1b45a1bf0bece46d",
  measurementId: "G-N5HP00VJC7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);