import { useEffect, useState } from "react";
import { Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import lanasImg from "../assets/img/nosotros/lanas.png";
import backImg from "../assets/img/nosotros/back.png";

const API_URL =
  "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/about-us/";

function Nosotros() {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const traerNosotros = async () => {
      try {
        const headers = { Authorization: "Bearer ipss.get" };
        const response = await fetch(API_URL, { headers });
        if (!response.ok) throw new Error("Error al cargar la información");
        const data = await response.json();
        setTexto(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    traerNosotros();
  }, []);

  if (loading)
    return (
      <Container className="nosotros-loading">
        <Spinner animation="border" />
        <div>Cargando información...</div>
      </Container>
    );

  if (error)
    return (
      <Container className="nosotros-error">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );

  // Resalta solo las partes indicadas
  const textoFinal = texto
    .replace(
      /"Tejelanas Vivi"/,
      `<span class="nosotros-pastel">"Tejelanas Vivi"</span>`
    )
    .replace(
      /(A través de técnicas ancestrales como el telar y el crochet)/,
      `<span class="nosotros-pastel2">$1</span>`
    )
    .replace(
      /(respetuoso con el medio ambiente.)/,
      `<span class="nosotros-pastel3">$1</span>`
    );

  return (
    <div className="div-nosotros-bg">
      <div
        className="div-nosotros-bg-img"
        style={{ backgroundImage: `url(${backImg})` }}
      />
      <Container fluid className="div-nosotros-content">
        <Row className="align-items-center">
          <Col md={6} xs={12}>
            <h2 className="titulo-productos mb-4">Sobre nosotros</h2>
            <div
              className="nosotros-descripcion"
              dangerouslySetInnerHTML={{ __html: textoFinal }}
            />
          </Col>
          <Col md={6} xs={12} className="columna-img">
            <img src={lanasImg} alt="Lanas" className="img-nosotros" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Nosotros;
