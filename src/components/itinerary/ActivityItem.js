import React from 'react';
import { formatDate } from '../utilities/Helper';

export const ActivityItem = ({ item, handleInputChange, openModal, index }) => {
    return (
        <div className="activity-item">
            <div className="icon-container">🎉</div>
            <div className="activity-info">
                <label>
                    Activity:
                    <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Address Line 1:
                    <input
                    type="text"
                    name="addressLine1"
                    value={item.addressLine1}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Address Line 2:
                    <input
                    type="text"
                    name="addressLine2"
                    value={item.addressLine2}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Activity Date:
                    <input
                    type="date"
                    name="activityDate"
                    value={item.activityDate.split('T')[0]}
                    onChange={(e) => handleInputChange(e, index)}
                    />
                </label>
                <label>
                    Activity Time:
                    <input
                    type="time"
                    name="activityTime"
                    value={item.activityTime}
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
                <div className="delete-icon" onClick={() => openModal('activity', index)}>🗑️</div>
            </div>
        </div>
    );
}