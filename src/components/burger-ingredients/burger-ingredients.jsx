import React, { useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { Link } from 'react-scroll';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function BurgerIngredients() {

    const dispatch = useDispatch();

    const products = useSelector((store) => store.getProducts.products);

    const [current, setCurrent] = useState('Булки');

    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const currentTarget = useSelector(store => store.ingredientDetails.current);

    const buns = products.filter(ingredient => ingredient.type === 'bun');
    const main = products.filter(ingredient => ingredient.type === 'main');
    const sauce = products.filter(ingredient => ingredient.type === 'sauce');
    const navigate = useNavigate()

    const containerRef = document.getElementById('ingredients-container');
    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)

    const scrollNavigation = () => {

        if (Math.abs(bunRef.current.getBoundingClientRect().top - containerRef.getBoundingClientRect().top)
            < Math.abs(sauceRef.current.getBoundingClientRect().top - containerRef.getBoundingClientRect().top)) {
            setCurrent('Булки');
        }

        else setCurrent('Соусы');

        if (Math.abs(mainRef.current.getBoundingClientRect().top - containerRef.getBoundingClientRect().top)
            < Math.abs(sauceRef.current.getBoundingClientRect().top - containerRef.getBoundingClientRect().top)) {
            setCurrent('Начинки');
        };

    }

    function onOpenModal(event) {

        const currentTarget = event.currentTarget;
        const targetProduct = products.find((product) => product._id === currentTarget.getAttribute('id'))

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: targetProduct,
            visible: true,
        })

    };

    function onCloseModal() {

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false,
        });
    };

    return (

        <section className={styles.ingredients} >
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >
                <Link
                    to='ingredients-buns'
                    spy={true}
                    smooth={true}
                    duration={400}
                    containerId='ingredients-container'
                    onSetActive={() => setCurrent('Булки')}
                >
                    <Tab value="Булки" active={current === 'Булки'} >
                        Булки
                    </Tab>
                </Link>
                <Link
                    to='ingredients-sauces'
                    spy={true}
                    smooth={true}
                    duration={400}
                    containerId='ingredients-container'
                    onSetActive={() => setCurrent('Соусы')}
                >
                    <Tab value="Соусы" active={current === 'Соусы'}>
                        Соусы
                    </Tab>
                </Link>
                <Link
                    to='ingredients-main'
                    spy={true}
                    smooth={true}
                    duration={400}
                    containerId='ingredients-container'
                    onSetActive={() => setCurrent('Начинки')}
                >
                    <Tab value="Начинки" active={current === 'Начинки'} >
                        Начинки
                    </Tab>
                </Link>
            </div>

            <div id='ingredients-container' onScroll={scrollNavigation} className={styles.container} >
                <p id='ingredients-buns' ref={bunRef} className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    {buns.map((product) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>
                <p id='ingredients-sauces' ref={sauceRef} className="text text_type_main-medium mt-10">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    {sauce.map((product) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>
                <p id='ingredients-main' ref={mainRef} className="text text_type_main-medium mt-10">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    {main.map((product) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>

            </div>

            {modalVisible && (
                <Navigate to="/ingredients">
                    <Modal onCloseModal={onCloseModal}>
                        {currentTarget ? (
                            <IngredientDetails products={products} onCloseModal={onCloseModal} />
                        ) : (
                            <></>
                        )}
                    </Modal>
                </Navigate>)}
        </section>

    )
}


export default BurgerIngredients;