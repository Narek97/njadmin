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
  canCloseWithOutsideClick,
  modalSize = 'sm',
}) => {
  const onClose = () => {
    if (canCloseWithOutsideClick) {
      handleClose();
    }
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      sx={{
        minHeight: '300px',
      }}>
      <div className={`custom-modal ${modalSize}`}>
        <button className={'close-icon'} data-testid="modal-close-test-id" onClick={handleClose}>
          x
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
