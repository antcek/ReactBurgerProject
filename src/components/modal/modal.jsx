import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';

function Modal(props) {

    useEffect(() => {

        function modalEscClose(event) {

            if (event.code === 'Escape')
                props.onCloseModal()
        }

        document.addEventListener('keydown', modalEscClose);

        return () => {
            document.removeEventListener('keydown', modalEscClose)
        }

    }, [props]);

    return ReactDOM.createPortal(
        <div >
            <div className={styles.modal}>

                {props.children}

            </div>

            <ModalOverlay onCloseModal={props.onCloseModal} />
        </div>,
        document.getElementById("react-modals")
    )
}

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,

};

export default Modal