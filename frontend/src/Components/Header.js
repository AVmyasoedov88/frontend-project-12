import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { clearChannel } from '../slices/channelSlice';

const Header = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Navbar
      expand="lg"
      className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
    >
      <Container>
        <Navbar.Brand href="/login">Hexlet Chat</Navbar.Brand>

        <Button
          variant="primary"
          onClick={() => [logOut(), dispatch(clearChannel())]}
          as={Link}
          to="/login"
          state={{ from: location }}
        >
          {t('exit')}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
