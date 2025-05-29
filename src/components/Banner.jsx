import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function Banner() {
  return (
    <div className="banner-main">
      <Container className="banner-container mw-100" >
        <h1 className="bienvenido">¡ Bienvenido a Teje Lanas Vivi !</h1>
        <Link className="banner-link" to="/productos">
        <h3>--Ver más--</h3>
        </Link>
      </Container>
    </div>
  );
}

export default Banner;