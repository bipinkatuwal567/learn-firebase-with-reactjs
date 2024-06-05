import "./App.css";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";
import WriteAndSignup from "./components/WriteAndSignup.jsx";


function App() {
  return (
    <FirebaseProvider>
      <div className="app">
        {/* <Signup /> */}
        {/* <Signin /> */}
        <WriteAndSignup />
      </div>
    </FirebaseProvider>
  );
}

export default App;
