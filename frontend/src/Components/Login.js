//import React from "react";
import FormLogin from "./LoginFormik";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "/home/anton/frontend-project-12/frontend/src/img/hexlet.jpeg";
import { useTranslation } from 'react-i18next';


const Login = () => {
  const { t } = useTranslation();

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
