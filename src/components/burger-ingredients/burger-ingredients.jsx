import PropTypes from 'prop-types';
import React from 'react';

import styles from './burger-ingredients.module.css';
import BurgerIngredientsTab from './burger-ingredients-tabs';
import { ingredients } from '../../utils/data.js';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';

function BurgerIngredients() {
    return (
        <section className={styles.ingredients}>

            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <div className={styles.tabs} >
                <BurgerIngredientsTab />
            </div>
            <p className="text text_type_main-medium">
                Булки
            </p>

            <IngredientCard ingredients={ingredients} />

        </section>
    )
}



BurgerIngredients.propTypes = {

}
export default BurgerIngredients;