import { Card, Col, Button, Modal, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import apis from "../../../api/index";

const MyAdvertCard = ({ advert, fetchAdverts }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const handleDelete = () => {
    setDisableBtn(true);
    setError(false);
    setError("");
    setSuccess(false);
    const payload = {
      userId: localStorage.getItem(process.env.REACT_APP_USER_ID_NAME),
    };
    apis
      .deleteAdvert(advert._id, payload)
      .then((res) => {
        setSuccess(true);
        fetchAdverts();
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
      <Col>
        <Card className="h-100 advert-cards bg-info text-justify">
          <Card.Img variant="top" src={advert.image} height="350" />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="text-warning">
              {truncateString(advert.name, 75)}
            </Card.Title>
            <Card.Text className="text-dark mt-2">
              {truncateString(advert.description, 100)}
            </Card.Text>
            <div className="d-flex justify-content-around mt-auto">
              <div className="btn btn-warning" style={{ cursor: "auto" }}>
                {advert.price}€
              </div>
              <Link
                to={`/advert/update/${advert._id}`}
                className="btn btn-primary links"
                variant="primary"
              >
                Modifier l'annonce
              </Link>
              <Button
                variant="dark"
                type="button"
                onClick={() => setShow(true)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>LaBonnePoire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous êtes sur le point de supprimer définitivement l'annonce:{" "}
          {advert.name}
          <br />
          Êtes-vous sûr de vouloir continuer ?
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          <div className="align-self-end">
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={() => setShow(false)}
            >
              Revenir en arrière
            </Button>
            <Button variant="dark" disabled={disableBtn} onClick={handleDelete}>
              Supprimer définitivement
            </Button>
          </div>
          <div className="mt-3">
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(false)}
                dismissible
              >
                Un problème est survenu ! Veuillez réessayer.
                <br />
                Message: {errorMessage}
              </Alert>
            )}
            {success && (
              <Alert
                variant="success"
                onClose={() => setSuccess(false)}
                dismissible
              >
                L'annonce a bien été supprimée.
              </Alert>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyAdvertCard;
