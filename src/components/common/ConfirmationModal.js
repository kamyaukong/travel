// /src/components/itinerary/utilities/ConfirmationModal.js
import React from 'react';
import ReactModal from 'react-modal';
// import './ConfirmationModal.css';

// Prevents screen readers from reading background content
ReactModal.setAppElement('#root');

export const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Action"
      className="modal-deleteconfimration"
      overlayClassName="modal-overlay-deleteconfimration"
    >
      <h2>Confirm Action</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Delete</button>
      <button onClick={onRequestClose}>Cancel</button>
    </ReactModal>
  );
};