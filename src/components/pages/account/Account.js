import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import apis from "../../../api/index";

const Account = ({ user, fetchUser }) => {
  const id = localStorage.getItem(process.env.REACT_APP_USER_ID_NAME);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState(
    new Date(user.birthDate).toISOString().slice(0, 10)
  );
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl] = useState(user.avatar);
  const [newPhoto, setNewPhoto] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordEquality, setPasswordEquality] = useState(false);

  const reset = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setBirthDate(new Date(user.birthDate).toISOString().slice(0, 10));
    setPhone("0" + user.phone);
    setAddress(user.address);
    setZipCode(user.zipCode);
    setCity(user.city);
    setCountry(user.country);
    setAvatar(null);
    setNewPhoto(null);
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    setError(false);
    setSuccess(false);
    setErrorMessage("");
    if (password && password !== confirmPassword) {
      setPasswordEquality(true);
      setDisableBtn(false);
      return;
    }
    const payload = new FormData();
    if (firstName.length > 0) payload.append("firstName", firstName);
    if (lastName.length > 0) payload.append("lastName", lastName);
    if (email !== user.email) payload.append("email", email);
    if (phone.length > 0) payload.append("phone", phone);
    if (birthDate) payload.append("birthDate", birthDate);
    if (password.length > 0) payload.append("password", password);
    if (avatar) payload.append("avatar", avatar);
    if (address.length > 0) payload.append("address", address);
    if (city.length > 0) payload.append("city", city);
    if (zipCode.length > 0) payload.append("zipCode", zipCode);
    if (country.length > 0) payload.append("country", country);
    if (oldPassword.length > 0) payload.append("oldPassword", oldPassword);
    payload.append("userId", id);
    apis
      .updateUser(id, payload)
      .then(() => {
        fetchUser();
        setSuccess(true);
        setDisableBtn(false);
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
    <Container>
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Bonjour{" "}
            <span className="text-primary fw-bolder fst-italic">
              {user?.firstName ?? (
                <>
                  <Spinner animation="grow" />
                </>
              )}{" "}
              !
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3 className="text-info">Mon profil</h3>
          {user ? (
            <Form className="my-3" onSubmit={handleSubmit}>
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
                <Form.Group as={Col} controlId="address">
                  <Form.Label className="text-primary">Adresse</Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="text"
                    name="address"
                    placeholder="Ex: 5 rue de Paris"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="zipCode">
                  <Form.Label className="text-primary">Code postal</Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="number"
                    name="zipCode"
                    max="99999"
                    min="01000"
                    placeholder="Ex: 69001"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="city">
                  <Form.Label className="text-primary">Ville</Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="text"
                    name="city"
                    placeholder="Ex: Lyon"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6} xs={12} controlId="country">
                  <Form.Label className="text-primary">Pays</Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="text"
                    name="country"
                    placeholder="Ex: France"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <input
                  accept="image/*"
                  name="avatar"
                  style={{ display: "none" }}
                  id="avatar"
                  onChange={(e) => {
                    setNewPhoto(URL.createObjectURL(e.target.files[0]));
                    setAvatar(e.target.files[0]);
                  }}
                  type="file"
                />
                <label htmlFor="avatar" className="label-photo">
                  <img
                    src={
                      newPhoto
                        ? newPhoto
                        : avatarUrl
                        ? avatarUrl
                        : "https://via.placeholder.com/150.png/eadeda/8a3033"
                    }
                    alt={firstName}
                    height="150"
                    width={!newPhoto ? "150" : undefined}
                    className="mx-auto rounded-circle"
                  />
                </label>
              </Row>
              <hr className="text-primary" />
              <h3 className="text-info">Mes identifiants</h3>
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
                <Form.Group as={Col} controlId="oldPassword">
                  <Form.Label className="text-primary">
                    Ancien mot de passe
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="password">
                  <Form.Label className="text-primary">
                    Nouveau mot de passe
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="confirmPassword">
                  <Form.Label className="text-primary">
                    Confirmez le nouveau mot de passe
                  </Form.Label>
                  <Form.Control
                    className="bg-transparent border-primary text-primary"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Row className="mb-3">
                  <Col xs={12} md={6} className="text-center">
                    <Button
                      type="button"
                      onClick={reset}
                      variant="outline-primary"
                    >
                      Réinitialiser
                    </Button>
                  </Col>
                  <Col xs={12} md={6} className="text-center">
                    <Button
                      type="submit"
                      disabled={disableBtn}
                      variant="primary"
                    >
                      Modifier mon profil
                    </Button>
                  </Col>
                </Row>
              </Row>
              <small className="text-primary">(*) Champs obligatoire</small>
            </Form>
          ) : (
            <>
              <Spinner animation="grow" />
            </>
          )}
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
                  Votre profil a bien été mis à jour.
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
