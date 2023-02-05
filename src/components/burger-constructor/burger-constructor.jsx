import React, { useCallback, useMemo } from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
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
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useModalData } from '../../services/custom-hooks/custom-hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { FlapperSpinner } from "react-spinners-kit";




function BurgerConstructor() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useModalData();

    const products = useSelector(store => store.getProducts.products);
    const location = useLocation();
    const accessToken = Cookies.get('accessToken');

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
    const constructorBuns = useSelector(store => store.burgerConstructor.buns);

    const bunsForOrder = useMemo(() => {
        return { ...constructorBuns }
    }, [constructorBuns])

    const burgerAllId = useMemo(() => {


        return { ingredients: [bunsForOrder[0], ...constructorIngredients, bunsForOrder[0]].map(ingredient => ingredient?._id) }
    }, [bunsForOrder, constructorIngredients])

    const totalPrice = useMemo(() => {

        const draggedBunsPrice = constructorBuns.reduce((accum, curr) => accum + curr.price, 0);
        const draggedIngredientsPrice = constructorIngredients.reduce((accum, curr) => accum + curr.price, 0);

        return draggedBunsPrice * 2 + draggedIngredientsPrice
    }, [constructorBuns, constructorIngredients])


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
        const targetProduct = products.find((product) => product._id === currentTarget.getAttribute('id'));

        if (event.target.closest('.constructor-element__action')) { return };

        if (targetProduct) {
            navigate(`/ingredients/${targetProduct?._id}`)
            localStorage.setItem('modalData', JSON.stringify(targetProduct));
        };

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: targetProduct,
            visible: true
        });
    };

    function onCloseModal() {
        localStorage.removeItem('modalData');

        if (location.pathname.startsWith('/ingredients')) {
            navigate('/', { replace: true })
        }

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false
        });


    };

    const createOrder = () => {
        if (accessToken && burgerAllId.ingredients[0] !== undefined) {
            dispatch(sendOrder(burgerAllId));
        }

        else navigate('/login', { replace: true })
    }

    const isModalPossible = () => {
        if (accessToken && burgerAllId.ingredients[0] !== undefined) {
            return onOpenModal
        }
    }

    return (

        <section id='constructor' className={styles.constructor}>
            <div ref={dropIngredient} className={throwArea}  >
                <div ref={dropBun}>
                    {constructorBuns.length === 0 ?
                        <div className={bunHovered}>
                            <FlapperSpinner
                                color='#e104fc'
                                size={30} />
                            Перенесите сюда булку
                        </div>
                        : constructorBuns.map((bun) =>
                            <motion.div
                                initial={{ opacity: 0, }}
                                animate={{ opacity: 1, }}
                                transition={{ duration: 1 }}
                                key={bun._id} id={bun._id} onClick={onOpenModal} className={styles.buns}>
                                <ConstructorElement

                                    type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image_large}
                                />
                            </motion.div>
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
                                    <motion.div
                                        initial={{ scale: 0, }}
                                        animate={{ scale: 1, }}
                                        transition={{ duration: 1 }}
                                        key={ingredient.key}>
                                        <DraggedIngredientCard

                                            id={ingredient._id}
                                            moveIngredient={moveIngredient}
                                            onOpenModal={onOpenModal}
                                            ingredient={ingredient}
                                            index={index} />
                                    </motion.div>
                                )}
                            </div>
                        }
                    </div>

                    {constructorBuns.length === 0 ?
                        <div className={botBunHovered}>
                            <FlapperSpinner
                                color='#e104fc'
                                size={30} />
                            Перенесите сюда булку
                        </div>
                        :
                        constructorBuns.map(bun =>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                key={bun._id} id={bun._id} onClick={onOpenModal} className={styles.buns}>
                                <ConstructorElement

                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image_large}
                                />
                            </motion.div>)}
                </div>
            </div>
            <div className={styles.order}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <div className={styles.icon}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                {burgerAllId.ingredients[0] === undefined ?
                    <Button disabled htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>

                    : <div onClick={createOrder}>
                        <Button onClick={isModalPossible()} htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>}

            </div>
            <AnimatePresence>
                {modalVisible && !currentIngredient &&
                    <motion.div
                        initial={{ opacity: 0, scaleY: 1 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Modal onCloseModal={onCloseModal}>
                            {<OrderDetails onCloseModal={onCloseModal} />}
                        </Modal>
                    </motion.div>
                }
            </AnimatePresence>
        </section>

    )
}



export default BurgerConstructor