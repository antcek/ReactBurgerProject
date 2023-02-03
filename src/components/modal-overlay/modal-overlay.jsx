import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function ModalOverlay({ onCloseModal }) {

    return (
        <NavLink to='/'>
            <div onClick={onCloseModal} className={styles.overlay} >
            </div>
        </NavLink>
    )
}

ModalOverlay.propTypes = {
    onCloseModal: PropTypes.func.isRequired,

}
export default ModalOverlay