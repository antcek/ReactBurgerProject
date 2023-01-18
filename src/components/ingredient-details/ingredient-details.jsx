import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';
import { useDispatch, useSelector } from 'react-redux';


function IngredientDetails({ onCloseModal,  }) {

    const dispatch = useDispatch();

    const { name, calories, proteins, fat, carbohydrates, image_large, _id } = useSelector((store) => (store.ingredientDetails.current));

    return (
        <div className={styles.details} >
            <div className={styles.header} >
                <p className="text text_type_main-large">
                    Детали ингредиента
                </p>
                <div onClick={onCloseModal} className={styles.close}>
                    <CloseIcon type="primary" />
                </div>
            </div>
            <div>
                <div className={styles.body} key={_id}>
                    <img src={image_large} alt='ингредиент' />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {name}
                    </p>
                    <div className={styles.wrapperCalories}>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {calories}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {proteins}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {fat}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {carbohydrates}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

IngredientDetails.propTypes = {
    currentTarget: PropTypes.object,
    products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,
    onCloseModal: PropTypes.func.isRequired,

}

export default IngredientDetails