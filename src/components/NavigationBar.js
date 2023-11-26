// /src/components/NavigationBar.js
import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../routers/Authentication';

import "./NavigationBar.css";

const NavigationBar = () => {
  const { isAuthenticated, userID, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSignupPage = location.pathname === '/signup';

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Itinerary Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { isAuthenticated ? (
            <>
              <Nav.Link href="#">{'User:' + userID}</Nav.Link>
              <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            (!isSignupPage && (
              <Nav.Item>
                <Nav.Link as={Link} to="/signup" className="nav-link">Sign Up</Nav.Link>
              </Nav.Item>
            ))
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
