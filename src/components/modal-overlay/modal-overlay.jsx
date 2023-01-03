import styles from './modal-overlay.module.css';

function ModalOverlay(props) {

    return (

        <div onClick={props.onOpenModal} className={styles.overlay} >

        </div>

    )
}

export default ModalOverlay