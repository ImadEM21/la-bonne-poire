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
import { Link } from "react-router-dom";

const Signup = ({ connexion }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditions, setConditions] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [passwordEquality, setPasswordEquality] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setBirthDate("");
    setPassword("");
    setConfirmPassword("");
    setConditions(false);
    setAvatar(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    setError(false);
    setErrorMessage("");
    if (password !== confirmPassword) {
      setPasswordEquality(true);
      return;
    }
    const payload = new FormData();
    payload.append("firstName", firstName);
    payload.append("lastName", lastName);
    payload.append("email", email);
    payload.append("phone", phone);
    payload.append("birthDate", birthDate);
    payload.append("password", password);
    payload.append("avatar", avatar);
    payload.append("role", "user");
    apis
      .signup(payload)
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
    <Container id="signup">
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Inscrivez vous en moins de 2 minutes et{" "}
            <span className="text-primary fw-bolder fst-italic">
              déposez vos annonces !
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Form className="mb-5" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label className="text-primary">Prénom*</Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="text"
                name="firstName"
                placeholder="Ex: Jean"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label className="text-primary">Nom*</Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="text"
                name="lastName"
                placeholder="Ex: Dupont"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="birthDate">
              <Form.Label className="text-primary">
                Date de naissance*
              </Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="date"
                name="birthDate"
                min="1900-01-01"
                max={new Date().toISOString().slice(0, 10)}
                placeholder="Ex: 23/06/1996"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="phone">
              <Form.Label className="text-primary">
                Numéro de téléphone
              </Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="tel"
                name="phone"
                placeholder="Ex: 0606060606"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <Form.Group as={Col} controlId="confirmPassword">
              <Form.Label className="text-primary">
                Confirmez votre mot de passe*
              </Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="avatar">
              <Form.Label className="text-primary">Photo de profil</Form.Label>
              <Form.Control
                className="bg-transparent border-primary text-primary"
                type="file"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="conditions">
              <Form.Check
                type="checkbox"
                name="conditions"
                checked={conditions}
                required
                onChange={(e) => setConditions(e.target.checked)}
                label={
                  <div className="text-primary">
                    J'accepte les conditions d'utilisation et la politique de
                    confidentialité
                  </div>
                }
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
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-primary">
              Connectez vous !
            </Link>
          </p>
        </Col>
      </Row>
      {passwordEquality && (
        <ToastContainer position="top-end" className="position-fixed">
          <Toast
            className="d-inline-block m-1"
            bg="danger"
            delay={8000}
            autohide
            animation
            onClose={() => setPasswordEquality(false)}
          >
            <Toast.Header closeButton>
              <strong className="me-auto">LaBonnePoire</strong>
            </Toast.Header>
            <Toast.Body className="text-primary">
              Oops ! Les mots de passe ne sont pas identiques
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
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

export default Signup;
