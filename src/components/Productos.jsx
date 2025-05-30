import { useEffect, useState } from "react";
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
  const normalizado = nombre
  return colorMap[normalizado];
}
// Solo productos
function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <div>Cargando productos...</div>
      </Container>
    );

  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );

  return (
    <Container className="py-5">
      <h2 className="titulo-productos">-Productos-</h2>
      <Row>
        {productos.map((producto) => (
          <Col md={4} sm={6} xs={12} className="mb-4 h-100" key={producto.id}>
            <Card className="h-100 d-flex flex-column">
              {producto.imgs && producto.imgs.length > 0 && (
                <Card.Img
                  variant="top"
                  src={producto.imgs[0]}
                  alt={producto.nombre}
                  style={{
                    objectFit: "cover",
                    height: "347px",
                  }}
                />
              )}
              <Card.Body className="d-flex flex-column">
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
                  <div className="mt-2">
                    <strong>Colores:</strong>{" "}
                    {producto.colores.map((color, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: "inline-block",
                          backgroundColor: getColorValue(color),
                          color: "#fff",
                          borderRadius: "10px",
                          padding: "0.15em 0.8em",
                          marginRight: "0.4em",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          fontSize: "0.8em",
                          minWidth: "48px",
                          textAlign: "center",
                          lineHeight: "1.5",
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
                  className="mt-3 btn-contactanos"
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                    variant="outline-info"
                    
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






