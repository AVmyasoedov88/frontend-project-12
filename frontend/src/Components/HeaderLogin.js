/* eslint-disable react/function-component-definition */
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const HeaderLogin = () => (
  <Navbar
    expand="lg"
    className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
  >
    <Container>
      <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default HeaderLogin;
