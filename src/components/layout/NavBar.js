import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ token, deconnexion }) => {
  const [user, setUser] = useState();

  const handleDeconnexion = () => {
    setUser();
    deconnexion();
  };

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_NAME)));
    }
  }, [token]);

  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='text-warning'>LaBonnePoire</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/advert" className='text-warning d-flex justify-content-center align-items-center'>Voir les annonces</Nav.Link>
            <Nav.Link href="/search" className='text-warning d-flex justify-content-center align-items-center'>Faire une recherche</Nav.Link>
            <Nav.Link href="/contact" className='text-warning d-flex justify-content-center align-items-center'>Nous contacter</Nav.Link>
            {user && token ? (
              <>
                <Nav.Link href="/create-advert" className='text-warning d-flex justify-content-center align-items-center'>Créer une annonce</Nav.Link>
                <Nav.Link href="/my-adverts" className='text-warning d-flex justify-content-center align-items-center'>Mes annonces</Nav.Link>
                <Nav.Link href="/offers" className='text-warning d-flex justify-content-center align-items-center'>Mes offres</Nav.Link>
                <Nav.Link href="/messages" className='text-warning d-flex justify-content-center align-items-center'>Messagerie</Nav.Link>
                <Nav.Link onClick={handleDeconnexion} className='text-warning'><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></Nav.Link>
                <Nav.Link href="/account" className='text-warning'><Image src={user.avatar} roundedCircle style={{height: '2.2rem'}} /></Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/signup" className='text-warning d-flex justify-content-center align-items-center'>Je m'inscris !</Nav.Link>
                <Nav.Link href="/login" className='text-warning d-flex justify-content-center align-items-center'>Je me connecte</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
