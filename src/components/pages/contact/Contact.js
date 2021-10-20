import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import apis from "../../../api/index";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setEmail("");
    setName("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(false);
    setError(false);
    setErrorMessage("");
    const payload = {
      email,
      name,
      message
    };
    apis
      .createForm(payload)
      .then((res) => {
        setSuccess(true);
        setDisableBtn(true);
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response);
        if (error.response && error.response.data.message)
          setErrorMessage(error.response.data.message);
        setError(true);
        setDisableBtn(false);
      });
  };

  return (
    <Container id="contact">
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Vous avez des questions ?{" "}
            <span className="text-primary fw-bolder fst-italic">
              N'hésitez pas à nous contacter !
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Form className="mb-5" onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label className="text-primary">Nom et prénom*</Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="text"
                name="name"
                placeholder="Ex: Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label className="text-primary">Email*</Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="email"
                name="email"
                placeholder="Ex: jean.dupont@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="message">
              <Form.Label className="text-primary">Votre message*</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-transparent border-primary text-primary"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message ici..."
                required
                rows={10}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6} className="text-center">
              <Button type="button" onClick={reset} variant="outline-primary">
                Réinitialiser
              </Button>
            </Col>
            <Col xs={12} md={6} className="text-center">
              <Button type="submit" disabled={disableBtn} variant="primary">
                Envoyer votre message
              </Button>
            </Col>
          </Row>
          <small className="text-primary">(*) Champs obligatoire</small>
        </Form>
      </Row>
      {error && (
        <ToastContainer position="top-end" className="position-fixed">
          <Toast
            className="d-inline-block m-1"
            bg="danger"
            animation
            onClose={() => setError(false)}
          >
            <Toast.Header closeButton>
              <strong className="me-auto">LaBonnePoire</strong>
            </Toast.Header>
            <Toast.Body className="text-primary">
              Oops ! Une erreur est survenue veuillez réessayer.
              <br />
              Message: {errorMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      {success && (
        <ToastContainer position="top-end" className="position-fixed">
          <Toast
            className="d-inline-block m-1"
            bg="success"
            animation
            onClose={() => setSuccess(false)}
          >
            <Toast.Header closeButton>
              <strong className="me-auto">LaBonnePoire</strong>
            </Toast.Header>
            <Toast.Body className="text-primary">
              Votre message est bien arrivé ! Merci !
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
};

export default Contact;
