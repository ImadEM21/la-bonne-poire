import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='text-warning'>LaBonnePoire</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/advert" className='text-warning'>Voir les annonces</Nav.Link>
            <Nav.Link href="/search" className='text-warning'>Faire une recherche</Nav.Link>
            <Nav.Link href="/contact" className='text-warning'>Nous contacter</Nav.Link>
            <Nav.Link href="/signup" className='text-warning'>Je m'inscris !</Nav.Link>
            <Nav.Link href="/login" className='text-warning'>Accéder à mon compte</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
