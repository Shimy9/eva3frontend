import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";

const API_URL =
  "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/";

const colorMap = {
  crema: "#FFFDD0",
  "verde esmeralda": "#50C878",
  azul: "#0074D9",
  fucsia: "#ff00ff",
  beige: "#F5F5DC",
  magenta: "#ff00ff",
};

function getColorValue(nombre) {
  const normalizado = nombre;
  return colorMap[normalizado];
}
// Solo productos
function Productos({ setProductoSeleccionado }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const headers = { Authorization: "Bearer ipss.get" };
        const response = await fetch(API_URL, { headers });
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();
        setProductos(data.data.productos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    traerProductos();
  }, []);

  if (loading)
    return (
      <Container className="productos-loading">
        <Spinner animation="border" />
        <div>Cargando productos...</div>
      </Container>
    );

  if (error)
    return (
      <Container className="productos-error">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );

  return (
    <Container className="productos-main-container">
      <h2 className="titulo-productos">-Productos-</h2>
      <Row className="justify-content-center">
        {productos.map((producto) => (
          <Col
            md={4}
            sm={6}
            xs={12}
            className="productos-columna"
            key={producto.id}
          >
            <Card className="productos-card">
              {producto.imgs && producto.imgs.length > 0 && (
                <Card.Img
                  variant="top"
                  src={producto.imgs[0]}
                  alt={producto.nombre}
                  className="productos-card-img"
                />
              )}
              <Card.Body className="productos-card-body">
                <div className="card-title">{producto.nombre}</div>
                <div className="card-divider" />
                <div className="card-description">{producto.descripcion}</div>
                <div className="card-divider" />
                {producto.tallas && producto.tallas.length > 0 && (
                  <div>
                    <strong>Tallas:</strong>{" "}
                    {producto.tallas.map((talla, idx) => (
                      <Badge bg="secondary" key={idx} className="me-1">
                        {talla}
                      </Badge>
                    ))}
                  </div>
                )}
                {producto.colores && producto.colores.length > 0 && (
                  <div className="div-colores">
                    <strong>Colores:</strong>{" "}
                    {producto.colores.map((color, idx) => (
                      <span
                        key={idx}
                        className="productos-color-badge"
                        style={{
                          backgroundColor: getColorValue(color),
                        }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                )}
                <div className="card-divider" />
                <div className="card-precio">
                  <strong>Precio: </strong> ${producto.precio}
                </div>
                <Button
                  className="btn-contactanos"
                  variant="outline-info"
                  onClick={() => {
                    setProductoSeleccionado(producto.nombre);
                    const contacto = document.getElementById("contacto");
                    if (contacto)
                      contacto.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contáctanos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Productos;
