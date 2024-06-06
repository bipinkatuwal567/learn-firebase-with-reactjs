import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { app } from "../firebase";
import { FirebaseAuth } from "../context/FirebaseContext";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => alert("User has been signed up"))
      .catch((err) => {
        alert(err.message);
      });
  };

  const googleSignup = () => {
    signInWithPopup(FirebaseAuth, provider);
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
      </div>
      <button onClick={googleSignup} style={{backgroundColor: "red"}}>Sign in with google</button>
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
};

export default Signup;
