// /src/components/itinerary/ItemFormController.js
import React from 'react';
import './ItemFormController.css';
import convertTo24Hour from '../utilities/Helper';
import { formatDateOnly } from '../utilities/Helper';

export default function ItemFormController ({ index, item, schema, handleChange, openModal, isEditing }) {
  const { fields } = schema;

  return (
    <div>
      <div className={schema.classname}>
        {fields.map(field => {
          const inputValue = field.type === 'time' && item[field.name] ? convertTo24Hour(item[field.name]) : item[field.name] || '';
          return (
            <label key={field.name}>
              {field.label}:
              <input
                type={field.type}
                name={field.name}
                value={field.type === 'date' ? formatDateOnly(item[field.name]) : inputValue}
                onChange={handleChange}
              />
            </label>
          )
        })}
        {isEditing && (
          <div className="delete-icon" onClick={() => openModal(index)}>🗑️</div>
        )}
      </div>
    </div>
  );
};
