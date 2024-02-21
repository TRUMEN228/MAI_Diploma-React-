import { FC } from "react";
import Modal from "react-modal";
import "./ModalWindow.css";

interface IModalWindowProps {
  children?: React.ReactNode;
  isOpened: boolean;
  onModalClose: () => void;
}

export const ModalWindow: FC<IModalWindowProps> = ({ children, isOpened, onModalClose }) => {
  const handleModalClose = () => {
    onModalClose();
  }

  Modal.setAppElement('#root');

  return (
    <>
      <Modal isOpen={isOpened} onRequestClose={handleModalClose} className="modal-content" overlayClassName="modal">
        <div className="modal-close-btn" onClick={handleModalClose}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z" fill="#B0B0B0"/>
          </svg>
        </div>

        {children}
      </Modal>
    </>
  );
};