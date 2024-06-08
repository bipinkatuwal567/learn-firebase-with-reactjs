import { Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path='/' element={<h2>Home</h2>} />
      <Route path='/login' element={<h2>Login</h2>} />
    </Routes>
  )
}

export default App
