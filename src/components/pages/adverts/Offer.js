import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import apis from "../../../api";

const Offer = ({ advert, token, userId }) => {
  const [show, setShow] = useState(false);
  const [euros, setEuros] = useState(
    parseInt(advert.price.toFixed(2).split(".")[0])
  );
  const [cents, setCents] = useState(
    parseInt(advert.price.toFixed(2).split(".")[1])
  );
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const handleSubmit = () => {
    setDisableBtn(true);
    setError(false);
    setSuccess(false);
    setErrorMessage("");
    const payload = {
      from: userId,
      to: advert.owner._id,
      advert: advert._id,
      offer: parseFloat(`${euros}.${cents}`),
      message,
      status: "pending",
      userId: userId,
    };
    apis
      .makeOffer(payload)
      .then((res) => {
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
    <>
      {token ? (
        <Button
          variant="primary"
          type="button"
          onClick={() => setShow(true)}
          className="text-warning"
        >
          Faire une offre
        </Button>
      ) : (
        <Link to="/login" className="btn btn-primary text-warning">
          Connectez vous pour faire une offre
        </Link>
      )}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="text-dark">
          Faire une offre
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="euros">
                <Form.Label className="text-dark">Nom de l'annonce*</Form.Label>
                <Form.Control
                  className="bg-transparent text-dark input-disabled"
                  name="name"
                  plaintext
                  readOnly
                  defaultValue={advert.name}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <h6 className="text-dark">Prix de l'article</h6>
              <Form.Group as={Col} controlId="euros">
                <Form.Label className="text-dark">Euros*</Form.Label>
                <Form.Control
                  className="bg-transparent input-disabled text-dark"
                  name="euros"
                  defaultValue={euros}
                  plaintext
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="cents">
                <Form.Label className="text-dark">Centimes*</Form.Label>
                <Form.Control
                  className="bg-transparent input-disabled text-dark"
                  name="cents"
                  defaultValue={cents}
                  plaintext
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <h6 className="text-dark">Votre proposition...</h6>
              <Form.Group as={Col} controlId="euros">
                <Form.Label className="text-dark">Euros*</Form.Label>
                <Form.Control
                  className="bg-transparent border-dark text-dark"
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
                <Form.Label className="text-dark">Centimes*</Form.Label>
                <Form.Control
                  className="bg-transparent border-dark text-dark"
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
              <Form.Group as={Col} controlId="message">
                <Form.Label className="text-dark">Votre message*</Form.Label>
                <Form.Control
                  as="textarea"
                  className="bg-transparent border-dark text-dark message-offer"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Votre message ici..."
                  required
                  rows={5}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          {error && (
            <Alert
              variant="danger"
              className="mx-auto"
              onClose={() => setError(false)}
              dismissible
            >
              Une erreur est survenue. Veuillez réessayer.
              <br />
              Message: {errorMessage}
            </Alert>
          )}
          {success && (
            <Alert
              variant="success"
              className="mx-auto"
              onClose={() => setSuccess(false)}
              dismissible
            >
              Votre offre a bien été envoyé !
            </Alert>
          )}
          <div className="ms-auto">
            <Button
              variant="outline-info"
              className="me-2"
              type="button"
              onClick={() => setShow(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="text-warning"
              disabled={disableBtn}
            >
              Faire une offre
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Offer;
