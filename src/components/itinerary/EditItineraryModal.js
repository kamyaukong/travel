// /src/components/itinerary/ItemFormController.js
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import validationRules from '../utilities/validationRules';
import ItemFormController from './ItemFormController';
import { itinerarySchema } from './ItemFormView';

import './EditItineraryModal.css';

export const EditItineraryModal = ({ isOpen, item, onSave, onRequestClose }) => {
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
        onRequestClose();
      };

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel="Edit Itinerary"
            className="modal-editItinerary"
            overlayClassName="modal-overlay-editItinerary"
            onRequestClose={onRequestClose}
        >
            <ItemFormController
                item={editedItinerary}
                schema={itinerarySchema}
                handleChange={handleChange}
            />
            <div className="error-messages">
                {errors.map((error, index) => (
                    <p key={index} className="error-text">{error}</p>
                ))}
            </div>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onRequestClose}>Cancel</button>
        </ReactModal>
    );
};
