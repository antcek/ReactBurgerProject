import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';

function IngredientDetails({ onCloseModal, currentTarget, products }) {

    const filteredIngredients = products.filter((product) => product._id === currentTarget.getAttribute('id'))

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

                {filteredIngredients.map((product) => {

                    return (<div className={styles.body} key={product}>
                        <img src={product.image_large} alt='ингредиент' />
                        <p className="text text_type_main-medium mt-4 mb-8">
                            {product.name}
                        </p>
                        <div className={styles.wrapperCalories}>
                            <div className={styles.substances}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Калории,ккал
                                </p>
                                <p className="text text_type_digits-default text_color_inactive ">
                                    {product.calories}
                                </p>
                            </div>
                            <div className={styles.substances}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Белки, г
                                </p>
                                <p className="text text_type_digits-default text_color_inactive ">
                                    {product.proteins}
                                </p>
                            </div>
                            <div className={styles.substances}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Жиры, г
                                </p>
                                <p className="text text_type_digits-default text_color_inactive ">
                                    {product.fat}
                                </p>
                            </div>
                            <div className={styles.substances}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Углеводы, г
                                </p>
                                <p className="text text_type_digits-default text_color_inactive ">
                                    {product.carbohydrates}
                                </p>
                            </div>
                        </div>
                    </div>)


                })}

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