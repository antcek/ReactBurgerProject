import PropTypes from 'prop-types';
import React from 'react';

import IngredientStyles from './burger-ingredients.module.css';
import BurgerIngredientsTab from './burger-ingredients-tabs';
import { ingredients } from '../../utils/data.js';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';

function BurgerIngredients() {
    return (
        <section >
            <div className={IngredientStyles.ingredients}>
                <h1 className="text text_type_main-large">
                    Соберите бургер
                </h1>
                <div className={IngredientStyles.tabs} >
                    <BurgerIngredientsTab />
                </div>
                <p className="text text_type_main-medium">
                    Булки

                </p>
                <IngredientCard ingredients={ingredients} />
                <p className="text text_type_main-medium">
                    Соусы
                </p>
                <p className="text text_type_main-medium">
                    Начинки
                </p>


            </div>
        </section>
    )
}



BurgerIngredients.propTypes = {

}
export default BurgerIngredients;