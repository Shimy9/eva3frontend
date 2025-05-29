import { Navbar, Container } from "react-bootstrap";

function MiniHeader() {
  return (
    <Navbar className="miniheader-navbar py-0">
      <Container fluid className="miniheader-container">
        <span className="miniheader-text">
          25% de descuento en la primera compra
        </span>
      </Container>
    </Navbar>
  );
}

export default MiniHeader;
