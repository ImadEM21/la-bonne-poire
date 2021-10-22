import { ListGroup } from "react-bootstrap";
import RecievedOffer from "./RecievedOffer";

const Recieved = ({ offers, userId, fetchOffers }) => {
  return (
    <ListGroup>
      {offers.map((offer) => (
        <RecievedOffer userId={userId} offer={offer} fetchOffers={fetchOffers} key={offer._id} />
      ))}
    </ListGroup>
  );
};

export default Recieved;
