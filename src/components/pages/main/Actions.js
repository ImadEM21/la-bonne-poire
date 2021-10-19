import { CardGroup, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Panel from "../../../images/panel.svg";
import Idea from "../../../images/idea.svg";
import Cart from "../../../images/cart.svg";
import Contact from "../../../images/contact.svg";
import SignUp from "../../../images/signup.svg";

const Actions = () => {
  return (
    <Row>
      <Col xs={12}>
        <CardGroup>
          <Link to="/advert" className="links mx-auto my-2">
            <Card className="h-100 action-cards bg-primary">
              <Card.Img variant="top" src={Cart} height="200" />
              <Card.Title className="text-dark">Accéder aux annonces en ligne</Card.Title>
            </Card>
          </Link>
          <Link to="/search" className="links mx-auto my-2">
            <Card className="h-100 action-cards bg-primary">
              <Card.Img variant="top" src={Idea} height="200" />
              <Card.Title className="text-dark">
                Vous avez une idée de ce que vous voulez ? C'est par ici ç!
              </Card.Title>
            </Card>
          </Link>
          <Link to="/contact" className="links mx-auto my-2">
            <Card className="h-100 action-cards bg-primary">
              <Card.Img variant="top" src={Contact} height="200" />
              <Card.Title className="text-dark">Une question ? Contactez nous !</Card.Title>
            </Card>
          </Link>
          <Link to="/signup" className="links mx-auto my-2">
            <Card className="h-100 action-cards bg-primary">
              <Card.Img variant="top" src={SignUp} height="200" />
              <Card.Title className="text-dark">
                Vous n'avez toujours pas de compte ? Créer votre compte en moins
                de 2 minutes
              </Card.Title>
            </Card>
          </Link>
          <Link to="/login" className="links mx-auto my-2">
            <Card className="h-100 action-cards bg-primary">
              <Card.Img variant="top" src={Panel} height="200" />
              <Card.Title className="text-dark">
                Vous avez déjà votre compte ? Connectez vous !
              </Card.Title>
            </Card>
          </Link>
        </CardGroup>
      </Col>
    </Row>
  );
};

export default Actions;
