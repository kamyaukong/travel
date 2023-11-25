// NavigationBar.js
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../routers/Authentication';

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
    <nav>
      <h1>Itinerary Management</h1>
      <div>
        { isAuthenticated ? (
          <>
            <label>{'User:' + userID}</label>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          (!isSignupPage && <Link to="/signup">Sign Up</Link>) 
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
