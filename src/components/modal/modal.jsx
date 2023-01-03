import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';

function Modal(props) {

    return ReactDOM.createPortal(
        <div>
            <div className={styles.modal}>

                {props.children}
            </div>

            <ModalOverlay />
        </div>,
        document.getElementById("react-modals")
    )
}

export default Modal