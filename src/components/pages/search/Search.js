import {
  Container,
  Row,
  Col,
  FormGroup,
  FormControl,
  Toast,
  ToastContainer,
  Image,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import apis from "../../../api";
import AdvertCard from "../adverts/AdvertCard";
import uniqid from "uniqid";
import Desert from "../../../images/desert.svg";

const Search = () => {
  const [query, setQuery] = useState("");
  const [originalAdverts, setOriginalAdverts] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAdverts = () => {
      apis
        .getAdverts()
        .then((res) => {
          setOriginalAdverts(res.data.adverts);
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

  const handleChange = (e) => {
    setQuery(e.target.value);
    const sortAdverts = originalAdverts.filter((advert) =>
      advert.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAdverts(sortAdverts);
  };

  return (
    <Container>
      <Row className="my-5">
        <Col xs={12}>
          <h1 className="text-info">
            Vous cherchez un élément en particulier ?{" "}
            <span className="text-primary fw-bolder fst-italic">
              Entrez le nom de votre produit !
            </span>
          </h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <FormGroup controlId="query">
            <FormControl
              type="search"
              className="bg-transparent border-primary text-primary"
              name="query"
              value={query}
              onChange={handleChange}
              placeholder="Ex: iPhone..."
            />
          </FormGroup>
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
              Aucune annonce ne correspond à votre recherche...{" "}
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

export default Search;
