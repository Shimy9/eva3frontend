import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Accordion,
} from "react-bootstrap";

const API_URL =
  "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/faq/";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para acordeones abiertos por FAQ
  const [openAccordions, setOpenAccordions] = useState({});

  useEffect(() => {
    const traerFaqs = async () => {
      try {
        const headers = { Authorization: "Bearer ipss.get" };
        const response = await fetch(API_URL, { headers });
        if (!response.ok)
          throw new Error("Error al cargar las preguntas frecuentes");
        const data = await response.json();
        const activos = data.data.filter((faq) => faq.activo);
        setFaqs(activos);
        // Por defecto, todos cerrados
        const initial = {};
        activos.forEach((faq) => (initial[faq.id] = []));
        setOpenAccordions(initial);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    traerFaqs();
  }, []);

  const handleAccordionClick = (faqId, eventKey) => {
    setOpenAccordions((prev) => {
      const current = prev[faqId] || [];
      if (current.includes(eventKey)) {
        // Si ya está abierto, ciérralo
        return { ...prev, [faqId]: [] };
      } else {
        // Abre el item
        return { ...prev, [faqId]: [eventKey] };
      }
    });
  };

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <div>Cargando preguntas frecuentes...</div>
      </Container>
    );

  if (error)
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );

  return (
    <Container className="my-5">
      <h2 className="titulo-productos  text-center">
        Preguntas Frecuentes
      </h2>
      <Row className="justify-content-center">
        {faqs.map((faq) => (
          <Col
            key={faq.id}
            xs={12}
            sm={8}
            md={6}
            lg={4}
            className="mb-4 d-flex justify-content-center"
          >
            <Accordion
              activeKey={openAccordions[faq.id]}
              alwaysOpen
              className="w-100 faq-accordion"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  onClick={() => handleAccordionClick(faq.id, "0")}
                >
                  {faq.titulo}
                </Accordion.Header>
                <Accordion.Body>{faq.respuesta}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FAQ;
