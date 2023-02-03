import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function IngredientDetails() {

     const current = useSelector((store) =>  (store.ingredientDetails.current));
     
    return (
      
        current?._id ? ( <div className={styles.details} >
            <div className={styles.header} >
                <p className="text text_type_main-large">
                    Детали ингредиента
                </p>
               
            </div>
            <div>
                <div className={styles.body} key={current._id}>
                    <img src={current.image_large} alt='ингредиент' />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {current.name}
                    </p>
                    <div className={styles.wrapperCalories}>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.calories}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.proteins}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.fat}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.carbohydrates}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>) : null

    )
}

IngredientDetails.propTypes = {
    

}

export default IngredientDetails