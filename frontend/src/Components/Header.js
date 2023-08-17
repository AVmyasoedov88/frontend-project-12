import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <Navbar expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
      </Container>
    </Navbar>
  );
};

export default Header;
