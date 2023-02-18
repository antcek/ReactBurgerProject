import styles from './modal-overlay.module.css';
import { IModal } from '../../services/types/types';
import { FC } from 'react';


const ModalOverlay: FC<IModal> = ({ onCloseModal }) => {

    return (

        <div onClick={onCloseModal} className={styles.overlay} >
        </div>

    )
}

export default ModalOverlay