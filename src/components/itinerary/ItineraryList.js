// /src/components/itinerary/ItineraryList.js

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routers/Authentication';
import { formatDateOnly } from '../common/Helper';
import callApi from "../../routers/api";

import "./ItineraryList.css";

const ItineraryList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to different routes
  const { userID } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    const config = {'Authorization': `Bearer ${token}`}
    //console.log('config: ', config);
    if (token) {
        callApi(`/itinerary/user/${userID}`, 'GET', null, config)
        .then(data => {
          setTrips(data);
        })
        .catch(error => {
          console.log('Error fetching trips: ', error.message);
        });
    } else {
      console.log('No token found');
    };
  }, []);

  const handleTripClick = (tripId) => {
    navigate(`/itinerary/${tripId}`);
  };

  return (
    <div>
      <div className="create-trip-button">
        <button onClick={() => navigate('/itinerary/new')}>Create New Trip</button>
      </div>
      <div className="trip-list">
        {trips.map(trip => (
          <div key={trip._id} 
                className="trip-box"
                onClick={() => handleTripClick(trip._id)}
                role="button"
                tabIndex="0"
          >
            <div className="trip-details">
              <b>{trip.name}</b><br/>
              From {formatDateOnly(trip.startDate)} to {formatDateOnly(trip.endDate)} <br/>
              Adult: {trip.adults} Child: {trip.children} <br/>
              Budget: {trip.budget}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryList;