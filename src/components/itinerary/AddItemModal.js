import React, { useState } from 'react';
import Modal from 'react-modal';
import ItemFormController from './ItemFormController';
import { flightSchema, hotelSchema, activitySchema } from './ItemFormModel';
import validationRules from './validationRules';

import './AddItemModal.css';

export const AddItemModal = ({ isOpen, itemType, onAddItem, onClose }) => {
  const [newItem, setNewItem] = useState({});
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    setErrors([]); // Clear error messages when user starts typing
  };

  const handleSubmit = () => {
    const validationErrors = validationRules[itemType](newItem);
    console.log('validationErrors - itemType:', itemType);
    if (validationErrors && validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddItem(itemType, newItem);
    onClose();
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
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      contentLabel="New Item"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="error-messages">
          {errors.map((error, index) => (
              <p key={index} className="error-text">{error}</p>
          ))}
      </div>
      {schema && (
        <>
          <ItemFormController
            item={newItem}
            schema={schema}
            handleChange={handleChange}
          />
          <button onClick={handleSubmit}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </>
      )}
    </Modal>
  );
};
