import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavbar = () => {
  return (
    <Navbar
      bg="dark" // Background color
      variant="dark" // Text color
      expand="lg"
      className="py-3" // Padding top and bottom
      style={{ marginBottom: '20px' }} // Margin bottom
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand style={{ fontSize: '24px', fontWeight: 'bold' }}>
            I Teach
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/paginate">
              <Nav.Link>Data Paginate</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
