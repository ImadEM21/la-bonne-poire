import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditions, setConditions] = useState("");
  const [avatar, setAvatar] = useState(null);
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
        <Form className="mb-5">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label className="text-primary">Prénom</Form.Label>
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
              <Form.Label className="text-primary">Nom</Form.Label>
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
              <Form.Label className="text-primary">Date de naissance</Form.Label>
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
              <Form.Label className="text-primary">Numéro de téléphone</Form.Label>
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
        </Form>
      </Row>
    </Container>
  );
};

export default Signup;
