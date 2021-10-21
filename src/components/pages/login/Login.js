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
import { Link } from "react-router-dom";
import apis from "../../../api/index";

const Login = ({ connexion }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(false);
    setError(false);
    setErrorMessage("");
    const payload = {
      email,
      password,
    };
    apis
      .login(payload)
      .then((res) => {
        connexion(res.data.token, res.data.userId);
        localStorage.setItem(
          process.env.REACT_APP_USER_NAME,
          JSON.stringify(res.data.user)
        );
        document.location.href = "/account";
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
    <Container id="login">
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Connectez-vous pour{" "}
            <span className="text-primary fw-bolder fst-italic">
              accéder à vos annonces !
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Form className="mb-3" onSubmit={handleSubmit}>
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
            <Form.Group as={Col} controlId="password">
              <Form.Label className="text-primary">Mot de passe*</Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                Créer mon compte
              </Button>
            </Col>
          </Row>
          <small className="text-primary">(*) Champs obligatoire</small>
        </Form>
      </Row>
      <Row>
        <Col xs={12}>
          <p className="text-info">
            Vous n'avez pas de compte ?{" "}
            <Link to="/signup" className="text-primary">
              Inscrivez vous !
            </Link>
          </p>
        </Col>
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
    </Container>
  );
};

export default Login;
