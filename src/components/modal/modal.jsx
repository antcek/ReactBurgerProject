import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';

function Modal({ onCloseModal, children }) {

    useEffect(() => {

        function modalEscClose(event) {

            if (event.code === 'Escape')
                onCloseModal()
        }

        document.addEventListener('keydown', modalEscClose);

        return () => {
            document.removeEventListener('keydown', modalEscClose)
        }

    }, [onCloseModal]);

    return ReactDOM.createPortal(
        <div >
            <div className={styles.modal}>

                {children}

            </div>

            <ModalOverlay onCloseModal={onCloseModal} />
        </div>,
        document.getElementById("react-modals")
    )
}

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal