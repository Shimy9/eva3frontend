import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas, Image } from "react-bootstrap";
import logo from "../assets/img/logos/logolanas.png";
import "../App.css"; 

function NavBar() {
  const [show, setShow] = useState(false);

  const opciones = [
    { id: 1, nombre: "Productos", link: "#productos" },
    { id: 2, nombre: "Nosotros", link: "#nosotros" },
    { id: 3, nombre: "FAQ", link: "#faq" },
    { id: 4, nombre: "Contacto", link: "#preguntas frecuentes" },
  ];

  const handleHome = () => {
    setShow(false);
  };

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="sm"
        sticky="top"
        className="navbar-main" // <-- NAVBAR PRINCIPAL
      >
        <Container fluid className="navbar-container"> {/* <-- CONTENEDOR DEL NAV */}
          {/* Logo y título */}
          <Navbar.Brand
            className="navbar-brand text-bold" // <--- BRAND Y TEXTBOLD
            as="div"
            onClick={handleHome}
          >
            <Image
              src={logo}
              alt="Logo"
              className="logo-img" // <-- LOGO
            />
            <span className="brand-text"> {/* <-- TEXTO DEL BRAND */}
              Teje Lanas Vivi
            </span>
          </Navbar.Brand>
        
          <Navbar.Collapse className="justify-content-end d-none d-sm-flex">
            <Nav>
              {opciones.map((opcion, idx) => (
                <Nav.Link
                  as={Link}
                  key={opcion.id}
                  to={opcion.link}
                  className="nav-link" // <-- NAV LINK
                >
                  {opcion.nombre}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
            <Navbar.Toggle
          className="nav-toggle"// <-- TOGGLE
            aria-controls="offcanvas-navbar"
            onClick={() => setShow(true)}
          />
        </Container>
      </Navbar>

      {/* Offcanvas para menú hamburguesa en móviles */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="top">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {opciones.map((opcion) => (
              <Nav.Link
                as={Link}
                key={opcion.id}
                to={opcion.link}
                onClick={() => setShow(false)}
                className="offcanvas-nav-link " // <-- OFFCANVAS NAV
              >
                {opcion.nombre}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
