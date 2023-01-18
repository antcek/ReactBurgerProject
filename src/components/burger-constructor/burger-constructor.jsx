import React, { useReducer, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { useDrop } from 'react-dnd';


const initialPriceCount = { count: 0 };

function BurgerConstructor({ dropHandler }) {

    const products = useSelector(store => store.getProducts.products);
    const dispatch = useDispatch();
    const [priceCount, priceCountDispatcher] = useReducer(priceReducer, initialPriceCount);

    const currentIngredient = useSelector(store => store.ingredientDetails.current);
    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const filterBun = products.filter((ingredient) => ingredient.type === "bun")[1];

    const imgBun = filterBun ? filterBun.image : null;
    const idBun = filterBun ? filterBun._id : null;
    const nameBun = filterBun ? filterBun.name : null;
    const priceBun = filterBun ? filterBun.price : null;

    const constructorIngredient = useSelector(store => store.burgerConstructor.ingredient)
    console.log(constructorIngredient.length === 0)
    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(itemId) {

            dropHandler(itemId)
        }
    });

    //  const filteredIngredients = products.filter((ingredient) => ingredient.type === 'sauce' || ingredient.type === 'main');

    useEffect(() => {

        priceCountDispatcher({ price: priceBun * 2 });


    }, [priceBun])


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

    return (

        <section ref={dropTarget} id='constructor' className={styles.constructor}>

            <div id={idBun} onClick={onOpenModal} className={styles.buns}>
                <ConstructorElement

                    type="top"
                    isLocked={true}
                    text={`${nameBun} (верх)`}
                    price={priceBun}
                    thumbnail={imgBun}
                />
            </div>
            <div className={styles.wrapper}>

                {constructorIngredient.length === 0 ? 'сюда ингредиенты'

                    : {/* {constructorIngredient.map((ingredient) => {

                    return (<div className={styles.ingredientsContainer}>

                        <DragIcon />

                        <div id={ingredient._id} onClick={onOpenModal} key={ingredient._id} className={styles.main} >

                            <ConstructorElement
                                type={undefined}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}

                            />
                        </div>
                    </div>
                    )

                })
                } */}}


            </div>
            <div id={idBun} onClick={onOpenModal} className={styles.buns}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${nameBun} (низ)`}
                    price={priceBun}
                    thumbnail={imgBun}
                />
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