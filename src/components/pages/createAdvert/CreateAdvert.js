import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import apis from '../../../api/index';

const CreateAdvert = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [euros, setEuros] = useState(1);
  const [cents, setCents] = useState(0);
  const [condition, setCondition] = useState("Neuf");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [emptyImage, setEmptyImage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    setError(false);
    setSuccess(false);
    setErrorMessage("");
    if (!image) {
      setEmptyImage(true);
      window.scrollTo(0, 0);
      setDisableBtn(false);
      return;
    }
    const payload = new FormData();
    payload.append('name', name);
    payload.append('description', description);
    payload.append('image', image);
    payload.append('price', parseFloat(`${euros}.${cents}`));
    payload.append('condition', condition);
    payload.append('owner', localStorage.getItem(process.env.REACT_APP_USER_ID_NAME));
    payload.append('userId', localStorage.getItem(process.env.REACT_APP_USER_ID_NAME))
    apis.createAdvert(payload)
    .then(res => {
        setSuccess(true);
        setDisableBtn(false);
    })
    .catch(error => {
        console.error(error);
      console.error(error.response);
      if (error.response && error.response.data.message) setErrorMessage(error.response.data.message);
      setError(true);
      setDisableBtn(false);
    });
  };

  const reset = () => {
    setName("");
    setDescription("");
    setCondition("Neuf");
    setImage(null);
    setEuros(1);
    setCents(0);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(newPhoto);
    },
    [newPhoto]
  );

  return (
    <Container id="createAdvert">
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Créez votre annonce,{" "}
            <span className="text-primary fw-bolder fst-italic">
              et vendez votre produit !
            </span>
          </h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <input
                accept="image/*"
                name="image"
                style={{ display: "none" }}
                id="image"
                onChange={(e) => {
                  setNewPhoto(URL.createObjectURL(e.target.files[0]));
                  setImage(e.target.files[0]);
                }}
                type="file"
              />
              <label htmlFor="image" className="label-photo">
                <img
                  src={
                    newPhoto
                      ? newPhoto
                      : "https://via.placeholder.com/300.png/eadeda/8a3033"
                  }
                  alt={name}
                  height="300"
                  width={!newPhoto ? "300" : undefined}
                  className="mx-auto"
                />
              </label>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="name">
                <Form.Label className="text-primary">
                  Nom du produit*
                </Form.Label>
                <Form.Control
                  className="bg-transparent border-primary text-primary"
                  type="text"
                  name="name"
                  placeholder="Ex: Aspirateur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="description">
                <Form.Label className="text-primary">Description*</Form.Label>
                <Form.Control
                  as="textarea"
                  className="bg-transparent border-primary text-primary"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Votre message ici..."
                  required
                  rows={10}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="conditon">
                <Form.Label className="text-primary">État</Form.Label>
                <Form.Select
                  aria-label="État"
                  className="bg-transparent border-primary text-primary"
                  name="name"
                  placeholder="Ex: Neuf"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                >
                  <option value="Neuf">Neuf</option>
                  <option value="Très bon état">Très bon état</option>
                  <option value="Bon état">Bon état</option>
                  <option value="Satisfaisant">Satisfaisant</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <h6 className="text-primary">Prix de l'article</h6>
              <Form.Group as={Col} controlId="euros">
                <Form.Label className="text-primary">Euros*</Form.Label>
                <Form.Control
                  className="bg-transparent border-primary text-primary"
                  type="number"
                  min="1"
                  name="euros"
                  placeholder="25"
                  value={euros}
                  onChange={(e) => setEuros(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="cents">
                <Form.Label className="text-primary">Centimes*</Form.Label>
                <Form.Control
                  className="bg-transparent border-primary text-primary"
                  type="number"
                  max="99"
                  name="cents"
                  placeholder="Ex: 99"
                  value={cents}
                  onChange={(e) => setCents(e.target.value)}
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
                  Publier votre annonce
                </Button>
              </Col>
            </Row>
            <small className="text-primary">(*) Champs obligatoire</small>
          </Form>
        </Col>
      </Row>
      {emptyImage && (
        <ToastContainer position="top-end" className="position-fixed">
          <Toast
            className="d-inline-block m-1"
            bg="danger"
            animation
            onClose={() => setEmptyImage(false)}
            autohide
            delay={6000}
          >
            <Toast.Header closeButton>
              <strong className="me-auto">LaBonnePoire</strong>
            </Toast.Header>
            <Toast.Body className="text-primary">
              Vous n'avez pas selectionné une image.
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
            <Toast.Body className="text-primary">Bravo ! Votre annonce est désormais en ligne !</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
};

export default CreateAdvert;
