import { Container,Row,Col } from "react-bootstrap";  

function LineaIzq() {   
  
  return (
              <Container fluid className="borde-mitad-container  ">
                <Row>
                  <Col>
            
                  </Col>
                   <Col
                    md={6}
                    xs={12}
                    className="borde-mitad-col"
                    style={{ borderBottom: "1px solid #ffe2bd" }}
                  >
                  </Col>
                </Row>
              </Container>

  );
}   

export default LineaIzq;
