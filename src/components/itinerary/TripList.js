// TripList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./TripList.css";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    if (token) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      // console.log('useEffect called: ', `${process.env.REACT_APP_API_URL}/itinerary`);
      axios.get(`${process.env.REACT_APP_API_URL}/itinerary`, config)
        .then(response => {
          setTrips(response.data);
        })
        .catch(error => {
          console.log('Error fetching trips: ', error.message);
        })
    } else {
      console.log('No token found');
    };
  }, []);

  //Handler for adding flights, hotels, activities
  const handleFlightClick = (tripId) => {
    // Add logic for flight button click
    console.log('Flight button clicked for trip', tripId);
  };

  const handleHotelClick = (tripId) => {
    // Add logic for hotel button click
    console.log('Hotel button clicked for trip', tripId);
  };

  const handleActivityClick = (tripId) => {
    // Add logic for activity button click
    console.log('Activity button clicked for trip', tripId);
  };

  const handleTripClick = (tripId) => {
    // Navigate to TripDetail with the tripId
    //history.push(`/trip/${tripId}`);
    console.log('Trip clicked', tripId);
    //navigate(`${process.env.REACT_APP_API_URL}/itinerary/${tripId}`);
    navigate(`/itinerary/${tripId}`);
  };

  return (
    <div>
      <div className="create-trip-button">
        <button onClick={() => navigate('/itinerary/new')}>Create New Trip</button>
      </div>
      {trips.map(trip => (
        <div key={trip._id} 
              className="trip-box"
              onClick={() => handleTripClick(trip._id)}
              role="button"
              tabIndex="0"
        >
          <img src={trip.image} alt={trip.name} />
          <div>
            <h3>{trip.name}</h3>
            <p>{trip.startDate}</p>
            {/* Add buttons and other details */}
            <div className="trip-buttons">
              <button onClick={() => handleFlightClick(trip._id)}>Flight</button>
              <button onClick={() => handleHotelClick(trip._id)}>Hotel</button>
              <button onClick={() => handleActivityClick(trip._id)}>Activity</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;
