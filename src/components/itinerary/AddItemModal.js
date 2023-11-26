// /src/itinerary/AddItemModal.js
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import FormGenerator from '../common/FormGenerator';
import validationRules from '../common/validationRules';

export const AddItemModal = ({ isOpen, itemType, onAddItem, onRequestClose }) => {
  const [itemToAdd, setNewItem] = useState({});
  const [errors, setErrors] = useState([]);

  // update user input to fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...itemToAdd, [name]: value });
    setErrors([]); // Clear error messages when user starts typing
  };

  // handle submit button
  const handleSubmit = () => {
    const validationErrors = validationRules[itemType](itemToAdd);
    if (validationErrors && validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddItem(itemType, itemToAdd);
    onRequestClose();
  };

  // Use reuseable component 'ItemFormController' to render itinerary item details
  return (
    <ReactModal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="New Item"
      className="modal-additem"
      overlayClassName="modal-overlay-additem"
    >
      {itemType && (
        <>
          <FormGenerator
            item={itemToAdd}
            schemaIdentifier={itemType}
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
