import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import apis from "../../../api";
import Recieved from "./Recieved";
import Sent from "./Sent";

const Offers = ({ userId }) => {
  const [key, setKey] = useState("recieved");
  const [sentOffers, setSentOffers] = useState([]);
  const [recievedOffers, setRecievedOffers] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchOffers = () => {
    apis
    .getUserOffers(userId)
    .then(res => {
        console.log(res);
        setSentOffers(res.data.offers.sent);
        setRecievedOffers(res.data.offers.recieved);
    })
    .catch((error) => {
      console.error(error);
      console.error(error.response);
      if (error.response && error.response.data.message)
        setErrorMessage(error.response.data.message);
      setError(true);
    });
  };

  useEffect(() => {
    const getOffers = () => {
      apis
        .getUserOffers(userId)
        .then(res => {
            console.log(res);
            setSentOffers(res.data.offers.sent);
            setRecievedOffers(res.data.offers.recieved);
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response);
          if (error.response && error.response.data.message)
            setErrorMessage(error.response.data.message);
          setError(true);
        });
    };
    getOffers();
  }, [userId]);

  return (
    <Container>
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Suivez l'état de{" "}
            <span className="text-primary fw-bolder fst-italic">
              vos offres
            </span>
          </h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={12}>
          <Tabs
            activeKey={key}
            onSelect={(key) => setKey(key)}
            id="offers"
            className="mb-3 bg-primary text-dark"
          >
            <Tab
              eventKey="sent"
              title="Offres envoyées"
              tabClassName="text-dark"
            >
              {sentOffers && <Sent offers={sentOffers} userId={userId} fetchOffers={fetchOffers} />}
            </Tab>
            <Tab eventKey="recieved" title="Offres reçues" tabClassName="text-dark">
              {recievedOffers && <Recieved offers={recievedOffers} userId={userId} fetchOffers={fetchOffers} />}
            </Tab>
          </Tabs>
        </Col>
      </Row>
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
    </Container>
  );
};

export default Offers;
