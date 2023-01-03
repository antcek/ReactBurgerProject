import PropTypes from 'prop-types';
import React from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerIngredients(props) {

    const [current, setCurrent] = React.useState('Булки');

    const buns = props.products.filter(ingredient => ingredient.type === 'bun');
    const main = props.products.filter(ingredient => ingredient.type === 'main');
    const sauce = props.products.filter(ingredient => ingredient.type === 'sauce');

    const categoryChange = (value) => {

        const ingredientsContainer = document.querySelector(`.${styles.container}`);
        const scrollBun = document.getElementById('bun').getBoundingClientRect().top;
        const scrollMain = document.getElementById('main').getBoundingClientRect().top;
        const scrollSauce = document.getElementById('sauce').getBoundingClientRect().top;

        setCurrent(value);

        const scrollCategory = () => {

            if (value === 'Булки') {
                return (scrollBun - ingredientsContainer.getBoundingClientRect().top)
            }

            else if (value === 'Соусы') {
                return (scrollSauce - ingredientsContainer.getBoundingClientRect().top)
            }

            else if (value === 'Начинки') {
                return (scrollMain - ingredientsContainer.getBoundingClientRect().top)
            }
        };

        ingredientsContainer.scrollBy(0, scrollCategory())

    }

    return (
        <section className={styles.ingredients} >
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >

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
    products: PropTypes.array.isRequired,
    onOpenModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;