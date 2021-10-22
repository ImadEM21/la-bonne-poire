import { ListGroup } from "react-bootstrap";
import SentOffer from "./SentOffer";

const Sent = ({ offers }) => {
  return (
    <ListGroup>
      {offers.map((offer) => (
        <SentOffer offer={offer} key={offer._id} />
      ))}
    </ListGroup>
  );
};

export default Sent;
