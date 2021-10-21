import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Offer = ({ advert, token }) => {
  const [show, setShow] = useState(false);
  const [euros, setEuros] = useState(
    parseInt(advert.price.toFixed(2).split(".")[0])
  );
  const [cents, setCents] = useState(
    parseInt(advert.price.toFixed(2).split(".")[1])
  );

  const handleSubmit = () => {
    
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" type="button" onClick={() => setShow(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit} className="text-warning">
            Faire une offre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Offer;
