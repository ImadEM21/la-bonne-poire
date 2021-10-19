import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="page-footer font-small pt-4 bg-primary">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md={6} className="mt-md-0 mt-3">
            <h5 className="text-dark">LaBonnePoire</h5>
            <ListGroup horizontal className='d-flex justify-content-center'>
                <ListGroup.Item className="bg-transparent border-0">
                    <FontAwesomeIcon icon={faFacebookSquare} color="#8a3033" size="2x" style={{cursor: 'pointer'}} />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0">
                    <FontAwesomeIcon icon={faInstagramSquare} color="#8a3033" size="2x" style={{cursor: 'pointer'}} />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0">
                    <FontAwesomeIcon icon={faLinkedin} color="#8a3033" size="2x" style={{cursor: 'pointer'}} />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0">
                    <FontAwesomeIcon icon={faTwitterSquare} color="#8a3033" size="2x" style={{cursor: 'pointer'}} />
                </ListGroup.Item>
            </ListGroup>
          </Col>

          <hr className="clearfix w-100 d-md-none pb-3" />

          <Col md={3} className="mb-md-0 mb-3">
            <h5 className="text-uppercase text-dark">Utilisateurs</h5>

            <ListGroup>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="#!" className="text-warning">Se connecter</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="#!" className="text-warning">Créer un compte</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="#!" className="text-warning">Contact</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className="mb-md-0 mb-3">
            <h5 className="text-uppercase text-dark">Annonces</h5>

            <ListGroup>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="#!" className="text-warning">Voir les annonces</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="#!" className="text-warning">Rechercher une annonce</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3 bg-info text-dark">
        © 2021 Copyright: LaBonnePoire
      </div>
    </footer>
  );
};

export default Footer;
