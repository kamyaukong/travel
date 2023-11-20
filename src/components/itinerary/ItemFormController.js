// ItemFormController.js
import React from 'react';
import './ItemFormController.css';

export default function ItemFormController ({ index, item, schema, handleChange, openModal, isEditing }) {
  const { icon, fields } = schema;
  /*
  console.log('ItemFormController:');
  console.log('ItemFormController item:', item);
  console.log('ItemFormController schema:', schema);
  console.log('ItemFormController handleChange:', handleChange)
  console.log('ItemFormController openModal:', openModal)
  */
  return (
    <div>
      <div className="itinerary-item">
        <div className="icon-container">{icon}</div>
        <div className="itinerary-info">
          {fields.map(field => (
            <label key={field.name}>
              {field.label}:
              <input
                type={field.type}
                name={field.name}
                value={item[field.name] || ''}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>
        {isEditing && (
          <div className="delete-icon" onClick={() => openModal('flights', index)}>🗑️</div>
        )}
      </div>
    </div>
  );
};
