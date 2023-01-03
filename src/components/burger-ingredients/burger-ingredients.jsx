import PropTypes from 'prop-types';
import React from 'react';

import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';


function BurgerIngredients(props) {

    const [current, setCurrent] = React.useState('Булки');

    const buns = props.products.filter(ingredient => ingredient.type === 'bun');
    const main = props.products.filter(ingredient => ingredient.type === 'main');
    const sauce = props.products.filter(ingredient => ingredient.type === 'sauce');

    const BurgerIngredientsTab = () => {

        const categoryChange = (value) => {

            setCurrent(value)

        }

        return (
            <div style={{ display: 'flex' }}>

                <Tab value="Булки" active={current === 'Булки'} onClick={categoryChange}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={categoryChange}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={categoryChange}>
                    Начинки
                </Tab>

            </div>
        )
    }



    return (
        <section className={styles.ingredients} >

            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >
                <BurgerIngredientsTab />
            </div>
            <div className={styles.container} >
                <p id="bun" className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    <IngredientCard onOpenModal={props.onOpenModal} category={buns} />
                </div>
                <p id="sauce" className="text text_type_main-medium mt-10">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    <IngredientCard onOpenModal={props.onOpenModal} category={sauce} />
                </div>
                <p id="main" className="text text_type_main-medium mt-10">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    <IngredientCard onOpenModal={props.onOpenModal} category={main} />
                </div>
            </div>

        </section>
    )
}


BurgerIngredients.propTypes = {

}
export default BurgerIngredients;