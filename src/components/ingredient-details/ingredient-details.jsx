import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientDetails(props) {

    return (
        <div className={styles.details} >
            <div className={styles.header} >

                <p className="text text_type_main-large">
                    Детали ингредиента
                </p>
                <div onClick={props.onCloseModal} className={styles.close}>
                    <CloseIcon type="primary" />
                </div>
            </div>
            <div>
                {/* img.LARGE!! */}
            </div>

        </div>

    )
}

export default IngredientDetails