import {
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
  Image,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import apis from "../../../api/index";
import AdvertCard from "./AdvertCard";
import uniqid from "uniqid";
import Desert from "../../../images/desert.svg";

const Adverts = () => {
  const [adverts, setAdverts] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAdverts = () => {
      apis
        .getAdverts()
        .then((res) => {
          setAdverts(res.data.adverts);
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response);
          if (error.response && error.response.data.message)
            setErrorMessage(error.response.data.message);
          setError(true);
        });
    };
    getAdverts();
  }, []);
  return (
    <Container id="advert">
      <Row className="mt-5">
        <Col xs={12}>
          <h1 className="text-info">
            Trouvez l'annonce qui saura{" "}
            <span className="text-primary fw-bolder fst-italic">
              vous satisfaire !
            </span>
          </h1>
        </Col>
      </Row>
      {adverts && adverts.length > 0 ? (
        <Row xs={1} md={3} className="g-4 mt-3 mb-5">
          {adverts.map((advert) => (
            <AdvertCard advert={advert} key={uniqid()} />
          ))}
        </Row>
      ) : (
        <Row className="my-3">
          <Col xs={12} className="d-flex flex-column justify-content-center">
            <h3 className="text-info text-center mb-5">
              Il semblerait qu'aucune annonce n'ait encore eté posté...{" "}
            </h3>
            <Image src={Desert} className="mx-auto mb-4" roundedCircle />
          </Col>
        </Row>
      )}
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

export default Adverts;
