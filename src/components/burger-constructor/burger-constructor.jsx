import React, { useReducer, useEffect, useState } from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { useDrop } from 'react-dnd';
import { SET_CONSTRUCTOR_BUN, SET_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burger-constructor';


const initialPriceCount = { count: 0 };

function BurgerConstructor() {

    const dispatch = useDispatch();
    const products = useSelector(store => store.getProducts.products);
    const [priceCount, priceCountDispatcher] = useReducer(priceReducer, initialPriceCount);

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
    const constructorBuns = useSelector(store => store.burgerConstructor.buns);

    const draggedBuns = constructorBuns.filter(item => item.type === 'bun');
    const draggedBunsPrice = draggedBuns.reduce((accum, curr) => accum + curr.price, 0);

    const draggedIngredients = constructorIngredients.filter(ing => ing.type === 'main' || ing.type === 'sauce');
    const draggedIngredientsPrice = draggedIngredients.reduce((accum, curr) => accum + curr.price, 0);

    const [, dropBun] = useDrop({
        accept: 'bun',
      
        drop(itemId) {

            dispatch({
                type: SET_CONSTRUCTOR_BUN,
                id: itemId.itemId,
                buns: [itemId]
            });
        }
    });
    
     
    const [, dropIngredient] = useDrop({
        accept: 'ingredients',
        drop(itemId) {
            
            if (draggedBuns.length !== 0) {
                dispatch({
                    type: SET_CONSTRUCTOR_INGREDIENT,
                    id: itemId.itemId,
                    ingredients: [itemId]
                });
            }
        }
    });

    useEffect(() => {

        priceCountDispatcher({ price: draggedBunsPrice * 2 + draggedIngredientsPrice })
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
            })
        }

    };

    function onCloseModal() {
        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false
        })
    };

    return (

        <section ref={dropBun} id='constructor' className={styles.constructor}>
            <div ref={dropIngredient} >
                {draggedBuns.length === 0 ?
                    <div className={styles.selectTopBun}>
                        Перенесите сюда булку
                    </div>
                    : draggedBuns.map((bun) =>
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

                <div  className={styles.wrapper}>

                    {draggedIngredients.length === 0 ? <div className={styles.ingredientsContainer}>
                        <DragIcon />
                        <div className={styles.selectMiddleIngredient}>
                            Перенесите сюда ингредиент
                        </div> </div> :

                        draggedIngredients.map((ingredient, index) =>

                        (<div key={index} id={ingredient._id} className={styles.ingredientsContainer}>
                            <DragIcon />
                            <div id={ingredient._id} onClick={onOpenModal} className={styles.main}>
                                <ConstructorElement
                                    handleClose={() =>
                                        dispatch({
                                            type: DELETE_CONSTRUCTOR_INGREDIENT,
                                            id: index
                                        })

                                    }
                                    type={undefined}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </div>
                        </div>
                        ))
                    }
                </div>

                {draggedBuns.length === 0 ?
                    <div className={styles.selectBotBun}>
                        Перенесите сюда булку
                    </div>
                    :
                    draggedBuns.map(bun =>
                        <div key={bun._id} id={bun._id} onClick={onOpenModal} className={styles.buns}>
                            <ConstructorElement

                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_large}
                            />
                        </div>)}

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
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    // products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,


}


export default BurgerConstructor