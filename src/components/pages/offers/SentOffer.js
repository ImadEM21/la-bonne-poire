import { ListGroupItem, Card, Badge, Image } from "react-bootstrap";

const SentOffer = ({ offer }) => {
  const showStatus = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="primary" className="ms-1">En attente de réponse</Badge>;
      case "refused":
        return <Badge bg="danger" className="ms-1">Refusée</Badge>;
      case "accepted":
        return <Badge bg="success" className="ms-1">Acceptée</Badge>;
      default:
        return <Badge className="ms-1" bg="info">Inconnu</Badge>;
    }
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
          </Card.Body>
        </Card>
      </ListGroupItem>
    </>
  );
};

export default SentOffer;
