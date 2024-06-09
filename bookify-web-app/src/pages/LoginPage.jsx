import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/FirebaseContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logInUserWithEmailAndPassword, logInWithGoogle, isLoggedIn } =
    useFirebase();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await logInUserWithEmailAndPassword(email, password);
    console.log(user);
  };

  const handleGoogleLogin = async () => {
    await logInWithGoogle();
  };
  return (
    <div className="mt-5">
      <h2>Log in</h2>
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
          <Button type="submit">Login</Button>
        </Form.Group>
      </Form>

      <div className="mt-3">
        <p>or</p>
        <Button variant="danger" onClick={handleGoogleLogin}>
          Login with google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
