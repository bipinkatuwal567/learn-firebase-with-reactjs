import React, { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";

const WriteAndSignup = () => {
  const { signupUserWithEmailAndPassword, putData, putDataNew } = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const triggerFunc = () => {
    putDataNew("grandfather/father/child", { name: "Bipin1", age: 21 });
  };

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
      <button
        onClick={() => {
          signupUserWithEmailAndPassword(email, password);
          putData("nature/fruits", { email, password });
        }}
      >
        Sign up
      </button>
      <button onClick={triggerFunc}>Trigger</button>
    </div>
  );
};

export default WriteAndSignup;
