import { ListGroup } from "react-bootstrap";
import SentOffer from "./SentOffer";

const Sent = ({ offers }) => {
  return (
    <ListGroup>
      {offers.map((offer) => (
        <SentOffer offer={offer} />
      ))}
    </ListGroup>
  );
};

export default Sent;
