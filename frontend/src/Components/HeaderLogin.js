import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { paths } from "../routes.js";


const HeaderLogin = () => {
 

  return (
    <Navbar
      expand="lg"
      className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
    >
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default HeaderLogin;
