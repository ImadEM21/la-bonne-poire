import {
  ListGroupItem,
  Card,
  Badge,
  Image,
  Button,
  Toast,
  ToastContainer,
  Modal,
  Alert,
} from "react-bootstrap";
import apis from "../../../api";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";

const RecievedOffer = ({ offer, userId, fetchOffers }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAccept, setShowAccept] = useState(false);
  const [showRefuse, setShowRefuse] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [sellerRating, setSellerRating] = useState(offer.sellerRating ? offer.sellerRating : 0);
  const [disableRating, setDisableRating] = useState(false);
  const [successRating, setSuccessRating] = useState(false);
  const [errorRating, setErrorRating] = useState(false);
  const [errorRatingMessage, setErrorRatingMessage] = useState("");

  const showStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge bg="primary" className="ms-1">
            En attente de réponse
          </Badge>
        );
      case "refused":
        return (
          <Badge bg="danger" className="ms-1">
            Refusée
          </Badge>
        );
      case "accepted":
        return (
          <Badge bg="success" className="ms-1">
            Acceptée
          </Badge>
        );
      default:
        return (
          <Badge className="ms-1" bg="info">
            Inconnu
          </Badge>
        );
    }
  };

  const handleChangeStatus = (status) => {
    setDisableBtn(true);
    setError(false);
    setSuccess(false);
    const payload = {
      status,
      userId,
    };
    apis
      .updateOffer(offer._id, payload)
      .then((res) => {
        setSuccess(true);
        fetchOffers();
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

  const handleEvaluate = () => {
    setDisableRating(true);
    setErrorRating(false);
    const payload = {
      sellerRating,
      userId,
    };
    apis
      .updateOffer(offer._id, payload)
      .then((res) => {
        setSuccessRating(true);
        fetchOffers();
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response);
        if (error.response && error.response.data.message)
          setErrorRatingMessage(error.response.data.message);
        setErrorRating(true);
        setDisableRating(false);
      });
  };

  return (
    <>
      <ListGroupItem key={offer._id} className="bg-transparent">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              Offre envoyé par {offer.from.firstName}{" "}
              <Image
                src={offer.from.avatar}
                roundedCircle
                style={{ height: "1.7rem" }}
                className="mx-1"
              />{" "}
              le {new Date(offer.createdAt).toLocaleDateString()}
            </div>
            <div className="d-flex align-items-center">
              Statut: {showStatus(offer.status)}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>{offer.advert.name}</Card.Title>
            <Card.Text>
              Message: <span className="text-dark">{offer.message}</span>
              <br />
              Offre: <Badge bg="dark">{offer.offer}€</Badge>
              <br />
              Prix initial: <Badge bg="warning">{offer.advert.price}€</Badge>
            </Card.Text>
            {offer.status === "pending" ? (
              <div className="d-flex justify-content-evenly">
                <Button
                  variant="outline-dark"
                  onClick={() => setShowRefuse(true)}
                >
                  Refuser l'offre
                </Button>
                <Button variant="primary" onClick={() => setShowAccept(true)}>
                  Accepter l'offre
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                {offer.sellerRating ? (
                  <ReactStars
                    count={5}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                    value={sellerRating}
                  />
                ) : (
                  <Button
                    variant="outline-dark"
                    onClick={() => setShowRating(true)}
                  >
                    Notez cette transaction !
                  </Button>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </ListGroupItem>
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
              Oops ! Une erreur est survenue veuillez recharger la page.
              <br />
              Message: {errorMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Modal show={showAccept} onHide={() => setShowAccept(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Vous êtes sur le point d'accepter l'offre de {offer.from.firstName}
          </Modal.Title>
        </Modal.Header>
        {success && (
          <Modal.Body>
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
            >
              L'offre a bien été mise à jour.
            </Alert>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShowAccept(false)}>
            Annuler
          </Button>
          <Button
            variant="primary"
            disabled={disableBtn}
            onClick={() => handleChangeStatus("accepted")}
          >
            Accepter l'offre
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRefuse} onHide={() => setShowRefuse(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Vous êtes sur le point de refuser l'offre de {offer.from.firstName}
          </Modal.Title>
        </Modal.Header>
        {success && (
          <Modal.Body>
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
            >
              L'offre a bien été mise à jour.
            </Alert>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShowRefuse(false)}>
            Annuler
          </Button>
          <Button
            variant="primary"
            disabled={disableBtn}
            onClick={() => handleChangeStatus("refused")}
          >
            Refuser l'offre
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRating} onHide={() => setShowRating(false)}>
        <Modal.Header closeButton>Évaluer cette transaction</Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          <ReactStars
            count={5}
            onChange={(newRating) => setSellerRating(newRating)}
            size={24}
            activeColor="#ffd700"
            value={sellerRating}
          />
          <div className="mt-2">
            {errorRating && (
              <Alert variant="danger">
                Oops ! Une erreur est survenue veuillez recharger la page.
                <br />
                Message: {errorRatingMessage}
              </Alert>
            )}
            {successRating && (
              <Alert variant="success">
                Votre évaluation a bien été enregistré. Merci !
              </Alert>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShowRating(false)}>
            Annuler
          </Button>
          <Button
            variant="dark"
            disabled={disableRating}
            onClick={handleEvaluate}
          >
            Évaluer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecievedOffer;
