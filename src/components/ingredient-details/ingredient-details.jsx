import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

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
                {props.products.map((product) => {

                    if (product._id === props.currentTarget.getAttribute('id')) {

                        return (<div className={styles.body} key={product._id}>
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
                    };
                })}

            </div>

        </div>

    )
}

IngredientDetails.propTypes = {
    currentTarget: PropTypes.object,
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })).isRequired,

    onCloseModal: PropTypes.func.isRequired,

}

export default IngredientDetails