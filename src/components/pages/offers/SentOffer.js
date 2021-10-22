import {
  ListGroupItem,
  Card,
  Badge,
  Image,
  Modal,
  Alert,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import apis from "../../../api";

const SentOffer = ({ offer, userId, fetchOffers }) => {
  const [show, setShow] = useState(false);
  const [buyerRating, setBuyerRating] = useState(
    offer.buyerRating ? offer.buyerRating : 0
  );
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

  const handleEvaluate = () => {
    setDisableRating(true);
    setErrorRating(false);
    const payload = {
      buyerRating,
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
      <ListGroupItem key={offer._id}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              Offre envoyé à {offer.to.firstName}{" "}
              <Image
                src={offer.to.avatar}
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
              Votre essage: <span className="text-dark">{offer.message}</span>
              <br />
              Votre offre: <Badge bg="dark">{offer.offer}€</Badge>
              <br />
              Prix initial: <Badge bg="warning">{offer.advert.price}€</Badge>
            </Card.Text>
            {offer.status !== "pending" && (
              <div className="d-flex justify-content-center">
                {offer.buyerRating ? (
                  <ReactStars
                    count={5}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                    value={buyerRating}
                  />
                ) : (
                  <Button variant="outline-dark" onClick={() => setShow(true)}>
                    Notez cette transaction !
                  </Button>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </ListGroupItem>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Évaluer cette transaction</Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          <ReactStars
            count={5}
            onChange={(newRating) => setBuyerRating(newRating)}
            size={24}
            activeColor="#ffd700"
            value={buyerRating}
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
          <Button variant="outline-dark" onClick={() => setShow(false)}>
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

export default SentOffer;
