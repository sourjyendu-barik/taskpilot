import React from "react";

const ModalWrapper = ({ children, onClose }) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <button
            className="btn-close ms-auto"
            onClick={onClose}
            type="button"
            aria-label="Close"
          ></button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
