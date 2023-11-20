// ConfirmationModal.js
import React from 'react';
import Modal from 'react-modal';
import './ConfirmationModal.css';

// Prevents screen readers from reading background content
Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Confirm Action</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Delete</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default ConfirmationModal;
