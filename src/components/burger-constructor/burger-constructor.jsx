import React, { useState, useContext, useReducer, useEffect } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { ProductsContext } from '../../utils/products-context.js';
import { sendOrder } from '../../utils/burger-api.js';

const initialPriceCount = { count: 0 };

function BurgerConstructor() {

    const products = useContext(ProductsContext);

    const [priceCount, priceCountDispatcher] = useReducer(reducer, initialPriceCount)

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const filterBun = products.filter((ingredient) => ingredient.type === "bun")[0];

    const imgBun = filterBun ? filterBun.image : null;
    const idBun = filterBun ? filterBun._id : null;
    const nameBun = filterBun ? filterBun.name : null;
    const priceBun = filterBun ? filterBun.price : null;

    const filteredIngredients = products.filter((ingredient) => ingredient.type === 'sauce' || ingredient.type === 'main');


    useEffect(() => {

        priceCountDispatcher({ price: priceBun * 2 })

    }, [priceBun])


    function reducer(state, action) {

        return { count: action.price }
    };


    function onOpenModal(event) {
        let target = event.target;
        let currentTarget = event.currentTarget;

        if (currentTarget.getAttribute('id')) {

            setModalContent(<IngredientDetails currentTarget={currentTarget} products={products} onCloseModal={onCloseModal} />);
            setModalVisible(true);
        }

        else if (target.closest('button')) {

            setModalContent(<OrderDetails sendOrder={sendOrder()} onCloseModal={onCloseModal} />);
            setModalVisible(true);
        }

    };

    function onCloseModal() {

        setModalVisible(false)
    };



    return (

        <section id='constructor' className={styles.constructor}>

            <div id={idBun} onClick={onOpenModal} className={styles.buns}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={nameBun + ' ' + '(верх)'}
                    price={priceBun}
                    thumbnail={imgBun}
                />
            </div>
            <div className={styles.wrapper}>

                {/* {filteredIngredients.map((ingredient) => {

                    return (
                        <div id={ingredient._id} onClick={onOpenModal} key={ingredient._id} className={styles.main} >
                            <DragIcon />
                            <ConstructorElement
                                type={undefined}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}

                            />
                        </div>
                    )

                })
                } */}

            </div>
            <div id={idBun} onClick={onOpenModal} className={styles.buns}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={nameBun + ' ' + '(низ)'}
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
                <div onClick={onOpenModal} >
                    <Button onClick={sendOrder} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {modalVisible && <Modal onCloseModal={onCloseModal}>
                {modalContent}
            </Modal>}
        </section>

    )
}

BurgerConstructor.propTypes = {
    // products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,


}


export default BurgerConstructor