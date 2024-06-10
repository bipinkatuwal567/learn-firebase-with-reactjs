import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarPage = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>Bookify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/book/add" as={Link}>Add Book</Nav.Link>
            <Nav.Link to="/book/orders" as={Link}>Orders</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavbarPage