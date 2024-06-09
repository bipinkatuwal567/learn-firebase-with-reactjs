import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/FirebaseContext";
import { useState } from "react";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpUserWithEmailAndPassword } = useFirebase();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = await signUpUserWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mt-5">
      <h2>Sign up</h2>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Create an account</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignupPage;
