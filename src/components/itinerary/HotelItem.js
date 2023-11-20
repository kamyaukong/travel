import React from 'react';
import { formatDate } from '../utilities/Helper';

export const HotelItem = ({ item, handleInputChange, openModal, index }) => {
    return (
        <div className="hotel-item">
            <div className="icon-container">🏨</div>
            <div className="hotel-info">
                <label>
                    Hotel Name:
                    <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Address:
                    <input
                    type="text"
                    name="addressLine1"
                    value={item.addressLine1}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                    type="text"
                    name="phone"
                    value={item.phone}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Check-in Date:
                    <input
                    type="date"
                    name="checkInDate"
                    value={item.checkInDate.split('T')[0]}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Check-in Time:
                    <input
                    type="time"
                    name="checkInTime"
                    value={item.checkInTime}
                    onChange={(e) => handleInputChange(e, 'hotels', index)}
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
                <div className="delete-icon" onClick={() => openModal('hotels', index)}>🗑️</div>
            </div>
        </div>
    );
}