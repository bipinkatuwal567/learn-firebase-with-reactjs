import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { app } from "../firebase";

const auth = getAuth(app)

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password).then(value => alert("User has been signed up")).catch(err => {
      alert(err.message);
    })
  }

  return (
    <div className="signup-page">
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
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
};

export default Signup;
