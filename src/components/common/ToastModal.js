import React, { useEffect } from 'react';
import './ToastModal.css';

export const ToastModal = ({ message, type='standard', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        onClose();
      }, 3000); // Close the modal after 3 seconds
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const modalClass = `toast-modal ${type}`;

  return (
    <div className={modalClass}>
      {message}
    </div>
  );
};
