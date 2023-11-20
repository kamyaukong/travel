// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <h1>Itinerary Management</h1>
      <div>
        { isLoggedIn ? (
          <>
            <button>Create New Trip</button>
            <Link to="/profile">UserID</Link>
            <button>Logout</button>
          </>
        ) : (
          <button>Sign Up</button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
