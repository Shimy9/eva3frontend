import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Accordion,
  Image,
} from "react-bootstrap";

const API_URL =
  "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/";

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para el Accordion abierto por cada servicio
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const traerServicios = async () => {
      try {
        const headers = { Authorization: "Bearer ipss.get" };
        const response = await fetch(API_URL, { headers });
        if (!response.ok) throw new Error("Error al cargar los servicios");
        const data = await response.json();
        setServicios(data.data.servicios);
        // Por defecto, el primer item de cada servicio abierto
        const initial = {};
        data.data.servicios.forEach((s) => (initial[s.id] = ["0"]));
        setOpenAccordions(initial);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    traerServicios();
  }, []);

  const handleAccordionClick = (servicioId, eventKey) => {
    setOpenAccordions((prev) => {
      const current = prev[servicioId] || ["0"];
      if (eventKey === "1") {
        // Si el 2 ya está abierto, ciérralo (pero deja el 1 abierto)
        if (current.includes("1")) {
          return { ...prev, [servicioId]: ["0"] };
        } else {
          return { ...prev, [servicioId]: ["0", "1"] };
        }
      }
      // El item 0 nunca se cierra
      return prev;
    });
  };

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <div>Cargando servicios...</div>
      </Container>
    );

  if (error)
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );

  return (
    <Container className="my-5 servicios-main-container">
      <h2 className="titulo-productos ">-Servicios-</h2>
      <Row className="justify-content-center">
        {servicios.map((servicio) => (
          <Col
            md={6}
            xs={12}
            key={servicio.id}
            className="mb-4 servicios-columna"
          >
            <Accordion
              activeKey={openAccordions[servicio.id]}
              alwaysOpen
              className="servicios-accordion"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>{servicio.nombre}</Accordion.Header>
                <Accordion.Body className="p-0">
                  {servicio.imgs && servicio.imgs.length > 0 && (
                    <Image
                      src={servicio.imgs[0]}
                      alt={servicio.nombre}
                      fluid
                      className="servicio-img"
                    />
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header
                  onClick={() => handleAccordionClick(servicio.id, "1")}
                >
                  Descripción
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <strong>Ubicación:</strong> {servicio.ubicacion}
                  </div>
                  <div>
                    <strong>Cupos:</strong> {servicio.cupos}
                  </div>
                  <div>
                    <strong>Fecha:</strong> {servicio.fecha}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Servicios;
