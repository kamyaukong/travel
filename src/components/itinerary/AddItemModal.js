// /src/itinerary/AddItemModal.js
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import FormGenerator from '../common/FormGenerator';
import validationRules from '../common/validationRules';
import { SCHEMAS } from '../common/FormGeneratorSchema';

export const AddItemModal = ({ isOpen, itemType, onAddItem, onRequestClose }) => {

  // Generate initial form state based on the schema
  const createInitialState = (schemaIdentifier) => {
    console.log('schemaIdentifier', schemaIdentifier);
    console.log('SCHEMAS', SCHEMAS);
    console.log('itemType', itemType );
    if (!schemaIdentifier || !SCHEMAS[schemaIdentifier]) {
      return {};
    } 
    const fields = SCHEMAS[schemaIdentifier].fields;
    const initialState = {};
    fields.forEach(field => {
      initialState[field.name] = field.defaultValue || '';
    });
    return initialState;
  };

  // Set the itemToAdd state to the initial values based on the current itemType
  useEffect(() => {
    if (isOpen) {
      setNewItem(createInitialState(itemType));
    }
  }, [itemType, isOpen]); // Depend on itemType and isOpen

  // const [itemToAdd, setNewItem] = useState({});
  const [itemToAdd, setNewItem] = useState(createInitialState(itemType));
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
