import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateBookListPage from "./pages/CreateBookList";
import NavbarPage from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <NavbarPage />
      <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/book/add" element={<CreateBookListPage />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
