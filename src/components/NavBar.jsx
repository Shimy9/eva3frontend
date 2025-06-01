import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas, Image } from "react-bootstrap";
import logo from "../assets/img/logos/logolanas.png";
import "../App.css";

function NavBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Opciones de navegación con sus hashes
  const opciones = [
    { id: 1, nombre: "Nosotros", link: "#nosotros" },
    { id: 2, nombre: "Productos", link: "#productos" },
    { id: 3, nombre: "Servicios", link: "#servicios" },
    { id: 4, nombre: "FAQ", link: "#faq" },
    { id: 5, nombre: "Contacto", link: "#contacto" },
  ];

  // Navegación a sección
  const handleNav = (hash) => {
    setShow(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
    } else {
      window.location.hash = hash;
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          // Ajusta el offset según el alto de tu navbar (por ejemplo, 70px)
          const yOffset = -60;
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 0);
    }
  };

  const handleHome = () => {
    setShow(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="sm"
        sticky="top"
        className="navbar-main"
      >
        <Container fluid className="navbar-container">
          <Navbar.Brand
            className="navbar-brand text-bold"
            as="div"
            onClick={() => {
              setShow(false);
              if (location.pathname !== "/") {
                navigate("/");
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <Image src={logo} alt="Logo" className="logo-img" />
            <span className="brand-text">Teje Lanas Vivi</span>
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end d-none d-sm-flex">
            <Nav>
              {opciones.map((opcion) => (
                <Nav.Link
                  key={opcion.id}
                  as="button"
                  className="nav-link"
                  style={{ background: "none", border: "none" }}
                  onClick={() => handleNav(opcion.link)}
                >
                  {opcion.nombre}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle
            className="nav-toggle"
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
                key={opcion.id}
                as="button"
                className="offcanvas-nav-link"
                style={{ background: "none", border: "none" }}
                onClick={() => handleNav(opcion.link)}
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
