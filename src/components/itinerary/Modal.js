// src/components/itinerary/Modal.js
import React from 'react';

const Modal = ({ handleClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
