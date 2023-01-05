import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onCloseModal }) {

    return (

        <div onClick={onCloseModal} className={styles.overlay} >

        </div>

    )
}

ModalOverlay.propTypes = {
    onCloseModal: PropTypes.func.isRequired,

}
export default ModalOverlay