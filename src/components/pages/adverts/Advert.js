import {
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
  Image,
  Spinner,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apis from "../../../api";
import Offer from "./Offer";

const Advert = ({ userId, token }) => {
  const { id } = useParams();
  const [advert, setAdvert] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAdvert = () => {
      apis
        .getAdvert(id)
        .then((res) => setAdvert(res.data.advert))
        .catch((error) => {
          console.error(error);
          console.error(error.response);
          if (error.response && error.response.data.message)
            setErrorMessage(error.response.data.message);
          setError(true);
        });
    };
    getAdvert();
  }, [id]);

  return (
    <>
      {advert ? (
        <Container>
          <Row className="mt-5 mb-3">
            <Col xs={12}>
              <h1 className="text-primary fw-bolder fst-italic">
                {advert.name}{" "}
                {advert.owner._id === userId && (
                  <>
                    {" "}
                    --{" "}
                    <Link
                      to={`/advert/update/${id}`}
                      className="btn btn-primary text-dark"
                    >
                      Modifier mon annonce
                    </Link>
                  </>
                )}
              </h1>
              <span
                className="ms-1 text-primary d-flex align-items-center"
                style={{ fontSize: "smaller" }}
              >
                Vendu par:
                <Image
                  src={advert.owner.avatar}
                  roundedCircle
                  style={{ height: "1.7rem" }}
                  className="mx-1"
                />
                {advert.owner.firstName} le{" "}
                {new Date(advert.createdAt).toLocaleDateString()}, dernière mise
                à jour le {new Date(advert.updatedAt).toLocaleDateString()}
              </span>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12} className="d-flex justify-content-between">
              <h5 className="btn btn-info text-warning cursor-none mb-0">
                Prix: <span className="text-dark">{advert.price}€</span>
              </h5>
              {userId !== advert.owner._id && (
                <Offer advert={advert} token={token} userId={userId} />
              )}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12} className="d-flex justify-content-between">
              <h5 className="btn btn-info text-warning cursor-none d-flex align-items-center">
                État: <span className="text-dark">{advert.condition}</span>
              </h5>
              {userId !== advert.owner._id && (
                <Button
                  variant="primary"
                  className="text-warning cursor-none d-flex align-items-center"
                >
                  Contacter le vendeur{" "}
                  <span className="ms-1 text-dark d-flex align-items-center">
                    {advert.owner.firstName}{" "}
                    <Image
                      src={advert.owner.avatar}
                      roundedCircle
                      style={{ height: "2.2rem" }}
                      className="ms-1"
                    />
                  </span>
                </Button>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} className="d-flex justify-content-center">
              <Image src={advert.image} fluid />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12}>
              <h4 className="text-primary">Description du produit</h4>
              <p className="text-info" style={{ lineHeight: "2rem" }}>
                {advert.description}
              </p>
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
      ) : (
        <Spinner
          animation="grow"
          className="align-self-center mt-auto"
          variant="primary"
        />
      )}
    </>
  );
};

export default Advert;
