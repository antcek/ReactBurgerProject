import PropTypes from 'prop-types';
import React from 'react';

import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';



function BurgerIngredients(props) {

    const buns = props.ingredients.filter(ingredient => ingredient.type === 'bun');
    const main = props.ingredients.filter(ingredient => ingredient.type === 'main');
    const sauce = props.ingredients.filter(ingredient => ingredient.type === 'sauce');

    const BurgerIngredientsTab = () => {

        const handleClick = (value) => {
            setCurrent(value)

        }

        const [current, setCurrent] = React.useState('Булки');

        return (
            <div style={{ display: 'flex' }}>

                <Tab value="Булки" active={current === 'Булки'} onClick={handleClick}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={handleClick}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={handleClick}>
                    Начинки
                </Tab>

            </div>
        )
    }

    return (
        <section className={styles.ingredients} >

            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <div className={styles.tabs} >
                <BurgerIngredientsTab />
            </div>
            <div className={styles.container}>
                <p id="bun" className="text text_type_main-medium">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    <IngredientCard category={buns} />
                </div>
                <p id="sauce" className="text text_type_main-medium">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    <IngredientCard category={sauce} />
                </div>
                <p id="main" className="text text_type_main-medium">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    <IngredientCard category={main} />
                </div>
            </div>

        </section>
    )
}


BurgerIngredients.propTypes = {
    ingredients: PropTypes.array
}
export default BurgerIngredients;