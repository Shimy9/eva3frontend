import { Container,Row,Col } from "react-bootstrap";  

function LineaDer() {   
  
  return (
              <Container fluid className="borde-mitad-container  ">
                <Row>
                  <Col
                    md={6}
                    xs={12}
                    className="borde-mitad-col"
                    style={{ borderBottom: "1px solid #ffe2bd" }}
                  >
                    {/* Contenido columna izquierda */}
                  </Col>
                  <Col md={6} xs={12}>
                    {/* Contenido columna derecha */}
                  </Col>
                </Row>
              </Container>

  );
}   

export default LineaDer;
