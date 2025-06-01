import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const ContactForm = ({ producto }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productoParam = params.get("producto") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    producto: producto || "",
    message: "",
  });
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState(false);

  // Actualiza el campo producto si cambia el prop
  useEffect(() => {
    setFormData((prev) => ({ ...prev, producto: producto || "" }));
  }, [producto]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es requerido";
    if (!formData.email) newErrors.email = "El correo electrónico es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no es válido";
    if (!formData.message) newErrors.message = "El mensaje es requerido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setSuccess(false);
      setError(validationErrors);
    } else {
      setError({});
      setSuccess(true);
    }
  };

  return (
    <Container className="my-4 contacto-main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="contacto-card">
            <Card.Body>
              <Card.Title as="h2" className="titulo-productos  text-center">
                Contacto
              </Card.Title>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    value={formData.name}
                    isInvalid={!!errors.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={formData.email}
                    isInvalid={!!errors.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProducto">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.producto}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Escriba su mensaje"
                    value={formData.message}
                    isInvalid={!!errors.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="info" className="btn-contacto">
                  Enviar
                </Button>
              </Form>
              {success && (
                <Alert variant="success" className="contacto-alert">
                  Mensaje enviado con éxito
                </Alert>
              )}
              {Object.values(errors).length > 0 && !success && (
                <Alert variant="danger" className="contacto-alert">
                  {Object.values(errors).map((error, idx) => (
                    <div key={idx}>{error}</div>
                  ))}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
