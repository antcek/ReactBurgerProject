import React, { useReducer, useEffect, useState } from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { useDrop } from 'react-dnd';
import { BURGER_CONSTRUCTOR_ELEMENT, SET_CONSTRUCTOR_ELEMENT } from '../../services/actions/burger-constructor';


const initialPriceCount = { count: 0 };

function BurgerConstructor({ }) {

    const products = useSelector(store => store.getProducts.products);
    const dispatch = useDispatch();
    const [priceCount, priceCountDispatcher] = useReducer(priceReducer, initialPriceCount);
    const [visibleIng, setVisible] = useState(true);

    useEffect(() => {
        dispatch({
            type: SET_CONSTRUCTOR_ELEMENT,
            ingredients: products,
            container: null

        })
    }, [products]);

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);
    console.log(currentIngredient)
    const constructorIngredient = useSelector(store => store.burgerConstructor.ingredients);

    const draggedBuns = constructorIngredient.filter(item => item.container === 'buns').slice(-1);
    const draggedIngredients = constructorIngredient.filter(item => item.container === 'ingredients');

    console.log(constructorIngredient)


    const [, dropBun] = useDrop({
        accept: 'buns',
        drop(itemId) {

            dispatch({
                type: BURGER_CONSTRUCTOR_ELEMENT,
                id: itemId.itemId,
                container: 'buns',

            });
        }
    });


    const [, dropIngredient] = useDrop({
        accept: 'ingredients',
        drop(itemId) {
            if (draggedBuns.length !== 0) {
                return dispatch({
                    type: BURGER_CONSTRUCTOR_ELEMENT,
                    id: itemId.itemId,
                    container: 'ingredients'
                });
            }


        }
    });

    useEffect(() => {

        priceCountDispatcher({ price: 0 });


    }, [])


    function priceReducer(state, action) {

        return { count: action.price }
    };

    function onOpenModal(event) {

        let currentTarget = event.currentTarget;
        const targetProduct = products.find((product) => product._id === currentTarget.getAttribute('id'))

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: targetProduct,
            visible: true
        })

    };

    function onCloseModal() {
        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false
        })


    };

    console.log(draggedIngredients)

    return (

        <section ref={dropBun} id='constructor' className={styles.constructor}>

            {draggedBuns.length === 0 ?

                <div className={styles.selectTopBun}>
                    Перенесите сюда булку
                </div>
                :

                draggedBuns.filter(item => item.container === 'buns')
                    .map((bun) =>
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

            <div ref={dropIngredient} className={styles.wrapper}>


                {draggedIngredients.length === 0 ? <div className={styles.ingredientsContainer}>
                    <DragIcon />
                    <div className={styles.selectMiddleIngredient}>
                        Перенесите сюда ингредиент
                    </div> </div> :

                    draggedIngredients.filter(item => item.container === 'ingredients')
                        .map((ingredient, index) =>

                            visibleIng && (<div key={index} id={index} className={styles.ingredientsContainer}>
                        <DragIcon />
                        <div id={ingredient._id} onClick={onOpenModal} className={styles.main}>
                            <ConstructorElement
                                handleClose={() => {
                                    setVisible(false);
                                    const indeh = draggedIngredients.findIndex(el => el._id === ingredient._id);
                                 draggedIngredients.splice(indeh, 1);
                                    console.log(draggedIngredients)
                                }}
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
                draggedBuns.filter(item => item.container === 'buns')
                    .map(bun =>
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
            {modalVisible && visibleIng && <Modal onCloseModal={onCloseModal}>
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