// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Acerca de Nosotros</h5>
            <p>
              Información.
            </p>
          </Col>
          <Col md={4}>
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Inicio</Link></li>

            </ul>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: contacto@ALMA.com</li>
              <li>Teléfono: +00000000</li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="footer-text">© 2025 ALMA. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
