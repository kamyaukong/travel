// /src/components/itinerary/utilities/Modal.js

export const Modal = ({ isOpen, handleClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};