// /src/components/itinerary/ItemFormController.js
import React from 'react';
import './ItemFormController.css';
import convertTo24Hour from '../utilities/Helper';

export default function ItemFormController ({ index, item, schema, handleChange, openModal, isEditing }) {
  const { icon, fields } = schema;

  return (
    <div>
      <div className="itinerary-item">
        {/*<div className="icon-container">{icon}</div> */}
        <div className="itinerary-info">
          {fields.map(field => {
            const inputValue = field.type === 'time' && item[field.name] ? convertTo24Hour(item[field.name]) : item[field.name] || '';
            return (
              <label key={field.name}>
                {field.label}:
                <input
                  type={field.type}
                  name={field.name}
                  value={item[field.name] || ''}
                  onChange={handleChange}
                />
              </label>
            )
          })}
        </div>
        {isEditing && (
          <div className="delete-icon" onClick={() => openModal('flights', index)}>🗑️</div>
        )}
      </div>
    </div>
  );
};
