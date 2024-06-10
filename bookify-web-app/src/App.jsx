import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateBookListPage from "./pages/CreateBookList";
import NavbarPage from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BookView from "./pages/BookView";
import BookOrderPage from "./pages/BookOrderPage";
import OrderCard from "./components/OrderCard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <NavbarPage />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/book/add" element={<CreateBookListPage />} />
          <Route path="/book/view/:id" element={<BookView />} />
          <Route path="/book/orders" element={<BookOrderPage />} />
          <Route path="/book/order/:bookId" element={<OrderCard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
