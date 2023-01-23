import React, { useCallback, useMemo } from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { useDrop } from 'react-dnd';
import {
    SET_CONSTRUCTOR_BUN,
    SET_CONSTRUCTOR_INGREDIENT,
    SORT_CONSTRUCTOR_INGREDIENT
} from '../../services/actions/burger-constructor';

import DraggedIngredientCard from '../burger-constructor-ingredients/burger-constructor-ingredients';



function BurgerConstructor() {


    const dispatch = useDispatch();
    const products = useSelector(store => store.getProducts.products);

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
    const constructorBuns = useSelector(store => store.burgerConstructor.buns);

    const draggedBunsPrice = constructorBuns.reduce((accum, curr) => accum + curr.price, 0);
    const draggedIngredientsPrice = constructorIngredients.reduce((accum, curr) => accum + curr.price, 0);

    const bunsForOrder = constructorBuns.slice().concat(constructorBuns);
    const burgerForOrder = bunsForOrder.concat(constructorIngredients)

    const totalPrice = useMemo(() => {
        return draggedBunsPrice * 2 + draggedIngredientsPrice
    }, [draggedBunsPrice, draggedIngredientsPrice])


    const [{ BunIsHover }, dropBun] = useDrop({
        accept: 'bun',
        collect: monitor => ({
            BunIsHover: monitor.isOver()
        }),
        drop(product) {

            dispatch({
                type: SET_CONSTRUCTOR_BUN,
                buns: product
            });
        }
    });

    const moveIngredient = useCallback((draggedIndex, hoverIndex) => {

        if (draggedIndex !== hoverIndex) {
            const dragItem = constructorIngredients[draggedIndex];
            const hoverItem = constructorIngredients[hoverIndex];

            const sortedIngredients = [...constructorIngredients];
            sortedIngredients[draggedIndex] = hoverItem;
            sortedIngredients[hoverIndex] = dragItem

            dispatch({

                type: SORT_CONSTRUCTOR_INGREDIENT,
                ingredients: sortedIngredients

            })
        }
    }, [constructorIngredients, dispatch])

    const [{ IngIsHover }, dropIngredient] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            IngIsHover: monitor.isOver()
        }),

        drop(product) {
            if (constructorBuns.length !== 0) {

                dispatch({
                    type: SET_CONSTRUCTOR_INGREDIENT,
                    ingredients: product,
                    key: Math.random()
                });
            }
        }
    });

    const bunHovered = `${styles.selectTopBun} ${BunIsHover ? styles.bunHovered : ''}`;
    const botBunHovered = `${styles.selectBotBun} ${BunIsHover ? styles.bunHovered : ''}`
    const ingredientHovered = `${styles.selectMiddleIngredient} ${IngIsHover ? styles.ingredientHovered : ''}`

    function onOpenModal(event) {


        const currentTarget = event.currentTarget;
        const targetProduct = products.find((product) => product._id === currentTarget.getAttribute('id'))

        if (event.target.closest('.constructor-element__action'))
            return;

        else {
            dispatch({
                type: CURRENT_INGREDIENT_DETAILS,
                product: targetProduct,
                visible: true
            });
        }

    };

    function onCloseModal() {
        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false
        });
    };


    return (

        <section ref={dropBun} id='constructor' className={styles.constructor}>
            <div ref={dropIngredient} >
                {constructorBuns.length === 0 ?
                    <div className={bunHovered}>
                        Перенесите сюда булку
                    </div>
                    : constructorBuns.map((bun) =>
                        <div key={bun._id} id={bun._id} onClick={onOpenModal} className={styles.buns}>
                            <ConstructorElement

                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_large}
                            />
                        </div>
                    )
                }

                <div >
                    {constructorIngredients.length === 0 ?
                        <div className={styles.ingredientsContainer}>
                            <DragIcon />
                            <div className={ingredientHovered}>
                                Перенесите ингредиент
                            </div>
                        </div>
                        : 
                         <div className={styles.wrapper}>
                        {constructorIngredients.map((ingredient, index) =>
               
                       
                        <DraggedIngredientCard
                            id={ingredient._id}
                            moveIngredient={moveIngredient}
                            key={ingredient.key}
                            onOpenModal={onOpenModal}
                            ingredient={ingredient}
                            index={index} />)}
                            </div>
                    }
                </div>

                {constructorBuns.length === 0 ?
                    <div className={botBunHovered}>
                        Перенесите сюда булку
                    </div>
                    :
                    constructorBuns.map(bun =>
                        <div key={bun._id} id={bun._id} onClick={onOpenModal} className={styles.buns}>
                            <ConstructorElement

                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_large}
                            />
                        </div>)}
            </div>
            <div className={styles.order}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <div className={styles.icon}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

                <Button onClick={onOpenModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>

            </div>
            {modalVisible && <Modal onCloseModal={onCloseModal}>
                {currentIngredient ? <IngredientDetails products={products} onCloseModal={onCloseModal} />
                    : <OrderDetails burgerForOrder={burgerForOrder} onCloseModal={onCloseModal} />
                }
            </Modal>}

        </section>

    )
}



export default BurgerConstructor