// /src/components/common/FormGenerator.js
import React from 'react';
import convertTo24Hour from './Helper';
import { formatDateOnly } from './Helper';
import { SCHEMAS } from './FormGeneratorSchema';  

// import './DynamicForm.css';

export default function FormGenerator ({ item, schemaIdentifier, handleChange, onDelete, deleteIconClassName }) {
  const schema = SCHEMAS[schemaIdentifier];
  if (!schema) {
      console.error(`Schema not found for identifier: ${schemaIdentifier}`);
    return null;
  }
  const { fields } = schema;
  // a generic form generator based on the schema passed from schema parameter. 
  //    The parent component read schemas from ItemFormView.js 
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
        {onDelete && (
          <div className={deleteIconClassName || "delete-icon"} onClick={() => onDelete(item.id)}>
            🗑️
          </div>
        )}
      </div>
    </div>
  );
};
