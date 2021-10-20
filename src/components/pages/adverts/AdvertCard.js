import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdvertCard = ({ advert }) => {
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <Col>
      <Link to={`/advert/${advert._id}`} className="links">
        <Card className="h-100 advert-cards bg-info text-justify">
          <Card.Img variant="top" src={advert.image} height="350" />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="text-warning">{truncateString(advert.name, 75)}</Card.Title>
            <Card.Text className="text-dark mt-2">
              {truncateString(advert.description, 100)}
            </Card.Text>
            <div className="d-flex justify-content-around mt-auto">
              <div className="btn btn-warning">{advert.price}€</div>
              <Button variant="primary">Voir l'annonce</Button>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default AdvertCard;
