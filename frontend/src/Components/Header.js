import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { auth, logOut } = useAuth();
  const { token } = auth;
  const { t } = useTranslation();

  return (
    <Navbar
      expand="lg"
      className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
    >
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>
        {token ? (
          <Button variant="primary" onClick={logOut}>
            {t("exit")}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
