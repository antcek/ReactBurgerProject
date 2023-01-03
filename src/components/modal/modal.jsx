import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';

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

    }, []);

    return ReactDOM.createPortal(
        <div >
            <div className={styles.modal}>

                {props.children}

            </div>

            <ModalOverlay onOpenModal={props.onCloseModal} />
        </div>,
        document.getElementById("react-modals")
    )
}

export default Modal