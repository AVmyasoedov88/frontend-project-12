import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth.js";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  const { auth, logOut } = useAuth();
  const { token } = auth;
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
        {token ? (<Button variant="primary" onClick={logOut}>Выйти</Button>) : null}
        
        
      </Container>
    </Navbar>
  );
};

export default Header;
