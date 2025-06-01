import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logos/logolanas.png";

const Footer = () => {
  return (
    <footer className="footer-main">
      <Container>
        <Row className="align-items-center text-center">
          <Col
            xs={12}
            md={3}
            className="mb-2 mb-md-0 d-flex justify-content-center"
          >
            <img src={logo} alt="Logo Tejelanas Vivi" className="footer-logo" />
          </Col>
          <Col xs={12} md={6} className="mb-2 mb-md-0 footer-text">
            <span>© 2025 Teje Lanas Vivi. Todos los derechos reservados.</span>
          </Col>
          <Col xs={12} md={3} className="footer-social">
            <a
              href="https://www.instagram.com/teje_lanas.vivi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://es-la.facebook.com/MezcliMam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://wa.me/56976322314"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
