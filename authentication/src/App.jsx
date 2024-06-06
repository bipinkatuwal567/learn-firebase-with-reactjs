import "./App.css";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import {
  FirebaseAuth,
  FirebaseProvider,
  useFirebase,
} from "./context/FirebaseContext.jsx";
import WriteAndSignup from "./components/WriteAndSignup.jsx";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(FirebaseAuth, (user) => {
    if (user) setUser(user);
    else {
      console.log("You have been logged out");
      setUser(null);
    }
  });
  useEffect(() => {}, []);

  return (
    <FirebaseProvider>
      {user === null ? (
        <div className="app">
          <Signup />
          <Signin />
          {/* <WriteAndSignup /> */}
        </div>
      ) : (
        <div className="app" style={{flexDirection: "column"}}>
          <h1>Hello {user.email}</h1>
          <button onClick={() => signOut(FirebaseAuth)}>Logout</button>
        </div>
      )}
    </FirebaseProvider>
  );
}

export default App;
