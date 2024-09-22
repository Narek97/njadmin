import { Modal } from '@mui/material';
import React, { FC } from 'react';
import './custom-modal.scss';

interface ICustomModal {
  children: React.ReactNode;
  modalSize?: 'sm' | 'md' | 'lg' | 'custom';
  isOpen: boolean;
  handleClose: () => void;
  canCloseWithOutsideClick?: boolean;
}

const CustomModal: FC<ICustomModal> = ({
  children,
  isOpen,
  handleClose,
  canCloseWithOutsideClick = true, // default to true
  modalSize = 'sm',
}) => {
  const handleModalClose = () => {
    if (canCloseWithOutsideClick) {
      handleClose();
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpen}
      onClose={handleModalClose}
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={`custom-modal ${modalSize}`}>
        <button
          className="close-icon"
          aria-label="Close modal"
          data-testid="modal-close-test-id"
          onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
