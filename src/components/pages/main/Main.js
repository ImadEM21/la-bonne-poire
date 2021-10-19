import { Container, Row, Col } from "react-bootstrap";
import Cards from "./Cards";
import Actions from './Actions';

const Main = () => {
  return (
    <Container className="p-5">
      <Row>
        <Col xs={12}>
          <h1 className="text-info">
            Bienvenue chez{" "}
            <span className="text-primary fw-bolder fst-italic">
              LaBonnePoire
            </span>
          </h1>
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs={12}>
          <h3 className="text-info">Découvrez nos différents services ! </h3>
        </Col>
      </Row>
      <Cards />
      <Row className="my-5">
        <Col xs={12}>
          <h3 className="text-info mt-5">Alors ça vous tente d'essayer ? N'hésitez plus !</h3>
        </Col>
      </Row>
      <Actions />
    </Container>
  );
};

export default Main;
