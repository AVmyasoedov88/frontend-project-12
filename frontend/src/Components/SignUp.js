import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../img/signUpImg.jpeg';
import SignUpLogin from './SignUpFormik';

const SignUp = () => {
  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Header />
      <Container fluid className="h-100 bg-light">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs="12" md="8" xxl="6">
            <Card>
              <Card.Body className="p-5 row">
                <Col
                  xs="12"
                  md="6"
                  className="d-flex align-items-center justify-content-center"
                >
                  <Image src={image} roundedCircle />
                </Col>
                <div className="col-12 col-md-6 mt-3 mt-mb-0">
                  <SignUpLogin />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SignUp;
