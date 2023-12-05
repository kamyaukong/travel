// /src/components/itinerary/ItemFormController.js
import React from 'react';
import convertTo24Hour from '../../common/Helper';
import { formatDateOnly } from '../../common/Helper';

// import './ItemFormController.css';

export default function ItemFormController ({ index, item, schema, handleChange, openModal, isEditing }) {
  const { fields } = schema;
  // a generic function to render itinerary items (flights, hotels, activities)
  // based on the schema passed from schema. The parent component read schemas from ItemFormView.js 
  //console.log(item);
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
