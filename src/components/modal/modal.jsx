import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { motion } from 'framer-motion';




function Modal({ onCloseModal, children }) {


    useEffect(() => {

        function modalEscClose(event) {

            if (event.code === 'Escape')
                onCloseModal();
        };

        document.addEventListener('keydown', modalEscClose);

        return () => {
            document.removeEventListener('keydown', modalEscClose)
        }

    }, [onCloseModal, children]);

    return ReactDOM.createPortal(
        <> 
            <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}>
                <div className={styles.wrapper}>
                    <div onClick={onCloseModal} className={styles.close}>
                        <CloseIcon type="primary" />
                    </div>

                    {children}


                </div>
                <ModalOverlay onCloseModal={onCloseModal} />
            </motion.div>
       
        </>,
        document.getElementById("react-modals")
    )
}

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal