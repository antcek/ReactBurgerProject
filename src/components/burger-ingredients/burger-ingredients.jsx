import PropTypes from 'prop-types';
import React from 'react';

import IngredientStyles from './burger-ingredients.module.css';
import BurgerIngredientsTab from './burger-ingredients-tabs';
import { ingredients } from '../../utils/data.js';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';

const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
const main = ingredients.filter(ingredient => ingredient.type === 'main');
const sauce = ingredients.filter(ingredient => ingredient.type === 'sauce');

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
                <div className={IngredientStyles.container}>

                    <p className="text text_type_main-medium">
                        Булки

                    </p>
                    <div className={IngredientStyles.wrapper}>
                        <IngredientCard ingredients={buns} />
                    </div>

                    <p className="text text_type_main-medium">
                        Соусы
                    </p>
                    <div className={IngredientStyles.wrapper} >
                        <IngredientCard ingredients={sauce} />
                    </div>

                    <p className="text text_type_main-medium">
                        Начинки
                    </p>
                    <div className={IngredientStyles.wrapper}>
                        <IngredientCard ingredients={main} />
                    </div>
                </div>
            </div>
        </section>
    )
}



BurgerIngredients.propTypes = {

}
export default BurgerIngredients;