import React, { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { motion } from 'framer-motion';


export interface IModal {
    onCloseModal: () => void;
    children?: ReactNode;
  }


const Modal: FC<IModal> = ({ onCloseModal, children }) => {

    useEffect(() => {
        
        function modalEscClose(event: KeyboardEvent): void {

            if (event.code === 'Escape')
                onCloseModal();
        };

        document.addEventListener('keydown', modalEscClose);

        return () => {
            document.removeEventListener('keydown', modalEscClose)
        }

    }, [onCloseModal, children]);

    return ReactDOM.createPortal(

        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}>
            <div className={styles.wrapper}>
                <div onClick={onCloseModal} className={styles.close}>
                    <CloseIcon type="primary" />
                </div>

                {children}


            </div>
            <ModalOverlay onCloseModal={onCloseModal} />
        </motion.div>,

        document.getElementById("react-modals")!
    )
}



export default Modal