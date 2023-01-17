import React, { useState, useReducer, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../utils/burger-api';



const initialPriceCount = { count: 0 };

function BurgerConstructor() {

    const products = useSelector(store => store.getProducts.products);

    const [priceCount, priceCountDispatcher] = useReducer(priceReducer, initialPriceCount)

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    //  const {modalVisible, modalContent} = useSelector((store) =>)

    const filterBun = products.filter((ingredient) => ingredient.type === "bun")[0];

    const imgBun = filterBun ? filterBun.image : null;
    const idBun = filterBun ? filterBun._id : null;
    const nameBun = filterBun ? filterBun.name : null;
    const priceBun = filterBun ? filterBun.price : null;

    //  const filteredIngredients = products.filter((ingredient) => ingredient.type === 'sauce' || ingredient.type === 'main');


    useEffect(() => {

        priceCountDispatcher({ price: priceBun * 2 });


    }, [priceBun])


    function priceReducer(state, action) {

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

            setModalContent(<OrderDetails onCloseModal={onCloseModal} />);
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
                    text={`${nameBun} (верх)`}
                    price={priceBun}
                    thumbnail={imgBun}
                />
            </div>
            <div className={styles.wrapper}>

                {/* {filteredIngredients.map((ingredient) => {

                    return ( <div className={styles.ingredientsContainer}>
                        
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
                } */}

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
                {modalContent}
            </Modal>}
        </section>

    )
}

BurgerConstructor.propTypes = {
    // products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,


}


export default BurgerConstructor