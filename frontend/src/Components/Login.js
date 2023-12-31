/* eslint-disable react/function-component-definition */
// import React from "react";
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormLogin from './LoginFormik';
import HeaderLogin from './HeaderLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../img/hexlet.jpeg';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="d-flex flex-column vh-100">
      <HeaderLogin />
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
                  <FormLogin />
                </div>
              </Card.Body>
              <Card.Footer className="p-4 text-center">
                <span>{t('notAccount')}</span>
                <a href="/signup">{t('registration')}</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
