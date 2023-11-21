// /src/itinerary/AddItemModal.js
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ItemFormController from './ItemFormController';
import { flightSchema, hotelSchema, activitySchema } from './ItemFormView';
import validationRules from '../utilities/validationRules';

import './AddItemModal.css';

export const AddItemModal = ({ isOpen, itemType, onAddItem, onRequestClose }) => {
  const [itemToAdd, setNewItem] = useState({});
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...itemToAdd, [name]: value });
    setErrors([]); // Clear error messages when user starts typing
  };

  const handleSubmit = () => {
    const validationErrors = validationRules[itemType](itemToAdd);
    if (validationErrors && validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddItem(itemType, itemToAdd);
    onRequestClose();
  };

  let schema;
  switch (itemType) {
    case 'flight':
      schema = flightSchema;
      break;
    case 'hotel':
      schema = hotelSchema;
      break;
    case 'activity':
      schema = activitySchema;
      break;
    default:
      schema = null;
  }

  return (
    <ReactModal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="New Item"
      className="modal-additem"
      overlayClassName="modal-overlay-additem"
    >
      {schema && (
        <>
          <ItemFormController
            item={itemToAdd}
            schema={schema}
            handleChange={handleChange}
          />
          <div className="error-messages">
              {errors.map((error, index) => (
                  <p key={index} className="error-text">{error}</p>
              ))}
          </div>
          <button onClick={handleSubmit}>Add</button>
          <button onClick={onRequestClose}>Cancel</button>
        </>
      )}
    </ReactModal>
  );
};
