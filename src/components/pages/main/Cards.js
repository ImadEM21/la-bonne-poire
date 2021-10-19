import { Card, Row, Col } from "react-bootstrap";
import Shop from "../../../images/shop.svg";
import Present from "../../../images/present.svg";
import Deliver from "../../../images/deliver.svg";
import Conclusion from "../../../images/conclusion.svg";

const Cards = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      <Col>
        <Card className="h-100 main-cards bg-info">
          <Card.Img variant="top" src={Shop} height="200" />
          <Card.Body>
            <Card.Title className="text-warning">
              Trouvez exactement ce qu'il vous faut.
            </Card.Title>
            <Card.Text className="text-dark">
              IL vous manque un carte de votre collection ? Vous avez besoin
              d'un vêtement ? Vous risquez de trouver ce qu'il vous faut par
              là...
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="h-100 main-cards bg-info">
          <Card.Img variant="top" src={Present} height="200" />
          <Card.Body>
            <Card.Title className="text-warning">
              Vendez les objets ou vêtements dont vous n'avez plus besoin
            </Card.Title>
            <Card.Text className="text-dark">
              C'est une bonne occasion pour se faire un petit peu d'argent en
              vendant ce qui ne vous sert plus.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="h-100 main-cards bg-info">
          <Card.Img variant="top" src={Deliver} height="200" />
          <Card.Body>
            <Card.Title className="text-warning">
              Soyez livrés directement chez vous par nos soins !
            </Card.Title>
            <Card.Text className="text-dark">
              Hé oui ! C'est nous mêmes qui vous livrons vos achats.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="h-100 main-cards bg-info">
          <Card.Img variant="top" src={Conclusion} height="200" />
          <Card.Body>
            <Card.Title className="text-warning">
              Concluez directement avec le vendeur
            </Card.Title>
            <Card.Text className="text-dark">
              Mettez vous directement en relation avec le vendeur avant de
              conclure un achat et inversement.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
