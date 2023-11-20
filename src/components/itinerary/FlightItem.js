import React from 'react';
import { formatDate } from '../utilities/Helper';

export const FlightItem = ({ item, handleInputChange, openModal, index }) => {
    return (
        <div className="flight-item">
            <div className="icon-container">✈️</div>
            <div className="flight-info">
                <label>
                    Airline:
                    <input
                    type="text"
                    name="airline"
                    value={item.airline}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Flight Number:
                    <input
                    type="text"
                    name="flightNumber"
                    value={item.flightNumber}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Departure Date:
                    <input
                    type="date"
                    name="departureDate"
                    value={item.departureDate.split('T')[0]}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Departure Time:
                    <input
                    type="time"
                    name="departureTime"
                    value={item.departureTime}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Confirmatoin Number:
                    <input
                    type="text"
                    name="confirmationNumber"
                    value={item.confirmationNumber}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Price:
                    <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Notes:
                    <input
                    type="textarea"
                    name="notes"
                    value={item.notes}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                {/* Add more fields as needed */}
                <div className="delete-icon" onClick={() => openModal('flights', index)}>🗑️</div>
            </div>
        </div>
    );
}
