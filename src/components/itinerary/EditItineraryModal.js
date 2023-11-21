// /src/components/itinerary/ItemFormController.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import validationRules from '../utilities/validationRules';

export const EditItineraryModal = ({ isOpen, item, onSave, onClose }) => {
    const [editedItinerary, setEditedItinerary] = useState(item);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItinerary({ ...editedItinerary, [name]: value });
        setErrors([]); // Clear error messages when user starts typing
    };

    const handleSubmit = () => {
        const validationErrors = validationRules.itinerary(editedItinerary);
        if (validationErrors && validationErrors.length > 0) {
          setErrors(validationErrors);
          return;
        }
        onSave(editedItinerary);
        onClose();
      };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Itinerary"
            className="modal-content"
            overlayClassName="modal-overlay"
            >
            <div className="edit-modal">
                <div>
                    <label>Name:
                        <input 
                            type="text" 
                            name="name" 
                            value={editedItinerary.name} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>From:
                        <input 
                            type="date" 
                            name="startDate" 
                            value={editedItinerary.startDate} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>to:
                        <input 
                            type="date" 
                            name="endDate" 
                            value={editedItinerary.endDate} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>adults:
                        <input 
                            type="number" 
                            name="adults" 
                            value={editedItinerary.adults} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>Child/Children:
                        <input 
                            type="number" 
                            name="children" 
                            value={editedItinerary.children} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>Budget:
                        <input 
                            type="number" 
                            name="budget" 
                            value={editedItinerary.budget} 
                            onChange={handleChange} 
                        />
                    </label>
                </div>
                <div className="error-messages">
                    {errors.map((error, index) => (
                        <p key={index} className="error-text">{error}</p>
                    ))}
                </div>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};
