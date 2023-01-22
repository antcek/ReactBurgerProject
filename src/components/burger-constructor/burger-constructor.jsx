import React, { useReducer, useEffect, useCallback } from 'react';
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

const initialPriceCount = { count: 0 };

function BurgerConstructor() {

    const dispatch = useDispatch();
    const products = useSelector(store => store.getProducts.products);
    const [priceCount, priceCountDispatcher] = useReducer(priceReducer, initialPriceCount);

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
    const constructorBuns = useSelector(store => store.burgerConstructor.buns);

    const draggedBunsPrice = constructorBuns.reduce((accum, curr) => accum + curr.price, 0);
    const draggedIngredientsPrice = constructorIngredients.reduce((accum, curr) => accum + curr.price, 0);

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

        const dragItem = constructorIngredients[draggedIndex];
        const hoverItem = constructorIngredients[hoverIndex];

        const sortedIngredients = [...constructorIngredients];
        sortedIngredients[draggedIndex] = hoverItem;
        sortedIngredients[hoverIndex] = dragItem

        dispatch({

            type: SORT_CONSTRUCTOR_INGREDIENT,
            ingredients: sortedIngredients

        })
    }, [constructorIngredients])

    const [{ IngIsHover }, dropIngredient] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            IngIsHover: monitor.isOver()
        }),

        drop(product) {
            if (constructorBuns.length !== 0) {

                dispatch({
                    type: SET_CONSTRUCTOR_INGREDIENT,
                    ingredients: product
                });
            }
        }
    });


    const [, sortedDrop] = useDrop({
        accept: 'sort-ingredients',

    })

    const bunHovered = BunIsHover ? { borderStyle: 'dashed', borderColor: 'aliceblue' } : null;
    const ingredientHovered = IngIsHover && constructorBuns.length !== 0 ? { borderStyle: 'dashed', borderColor: 'aliceblue' } : null;


    useEffect(() => {
        priceCountDispatcher({ price: draggedBunsPrice * 2 + draggedIngredientsPrice });

    }, [draggedBunsPrice, draggedIngredientsPrice])

    function priceReducer(state, action) {

        return { count: action.price }
    };

    function onOpenModal(event) {

        let currentTarget = event.currentTarget;
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
                    <div style={bunHovered} className={styles.selectTopBun}>
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

                <div className={styles.wrapper}>
                    {constructorIngredients.length === 0 ?
                        <div className={styles.ingredientsContainer}>
                            <DragIcon />
                            <div style={ingredientHovered} className={styles.selectMiddleIngredient}>
                                Перенесите ингредиент
                            </div>
                        </div>
                        : constructorIngredients.map((ingredient, index) =>
                        (<DraggedIngredientCard
                            id={ingredient._id}
                            moveIngredient={moveIngredient}

                            key={index}
                            onOpenModal={onOpenModal}
                            ingredient={ingredient}
                            index={index} />))
                    }
                </div>

                {constructorBuns.length === 0 ?
                    <div style={bunHovered} className={styles.selectBotBun}>
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
                    <p className="text text_type_digits-medium">{priceCount.count}</p>
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
                    : <OrderDetails onCloseModal={onCloseModal} />
                }
            </Modal>}

        </section>

    )
}

BurgerConstructor.propTypes = {
    // products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,


}


export default BurgerConstructor