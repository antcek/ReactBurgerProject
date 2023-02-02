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
import { sendOrder } from '../../services/thunk-actions/thunk-actions';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';


function BurgerConstructor() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(store => store.getProducts.products);
    const accessToken = Cookies.get('accessToken')

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
    const constructorBuns = useSelector(store => store.burgerConstructor.buns);

    const draggedBunsPrice = constructorBuns.reduce((accum, curr) => accum + curr.price, 0);
    const draggedIngredientsPrice = constructorIngredients.reduce((accum, curr) => accum + curr.price, 0);

    const bunsForOrder = constructorBuns.slice().concat(constructorBuns);
    const burgerForOrder = bunsForOrder.concat(constructorIngredients);
    const burgerAllId = useMemo(() => {
        return { ingredients: burgerForOrder.map(ingredient => ingredient._id) }
    }, [burgerForOrder]
    )

    const isUserLogged = useSelector(store => store.loginUser.userAuthorizied);
    
    const totalPrice = useMemo(() => {
        return draggedBunsPrice * 2 + draggedIngredientsPrice
    }, [draggedBunsPrice, draggedIngredientsPrice])


    const [{ canDrop }, dropBun] = useDrop({
        accept: 'bun',
        collect: monitor => ({

            canDrop: monitor.canDrop(),

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

    const [{ canDropIng }, dropIngredient] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            canDropIng: monitor.canDrop(),

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

    const bunHovered = `${styles.selectTopBun} ${canDrop ? styles.bunHovered : ''}`;
    const botBunHovered = `${styles.selectBotBun} ${canDrop ? styles.bunHovered : ''}`;
    const ingredientHovered = `${styles.selectMiddleIngredient} 
         ${canDropIng && constructorBuns.length !== 0 ?
            styles.ingredientHovered : ''}`;
    const throwArea = `${styles.throwAreaEmpty} ${constructorBuns.length !== 0 &&
        (canDropIng || canDrop) ?
        styles.throwAreaFilled : ''}`;


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

        <section id='constructor' className={styles.constructor}>
            <div ref={dropIngredient} className={throwArea}  >
                <div ref={dropBun}>
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

                    <div  >
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
            </div>
            <div className={styles.order}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <div className={styles.icon}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>

                {burgerForOrder.length === 0 ?
                    <Button disabled htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>

                    : <div onClick={() => {
                        accessToken ? dispatch(sendOrder(burgerAllId))
                            : navigate('/login', { replace: true })
                    }
                    }>
                        <Button onClick={accessToken ? onOpenModal : null} htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>}

            </div>
            {modalVisible && <Modal onCloseModal={onCloseModal}>
                {currentIngredient ? <IngredientDetails products={products} onCloseModal={onCloseModal} />
                    : <OrderDetails burgerForOrder={burgerForOrder} onCloseModal={onCloseModal} />}
            </Modal>}

        </section>

    )
}



export default BurgerConstructor