import { ListGroup } from "react-bootstrap";
import SentOffer from "./SentOffer";

const Sent = ({ offers, userId, fetchOffers }) => {
  return (
    <ListGroup>
      {offers.map((offer) => (
        <SentOffer
          offer={offer}
          key={offer._id}
          userId={userId}
          fetchOffers={fetchOffers}
        />
      ))}
    </ListGroup>
  );
};

export default Sent;
