import React, { useState } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';



function BurgerConstructor({ products }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const filterBun = products.find((bun) => bun.name === "Краторная булка N-200i");
    const imgBun = filterBun ? filterBun.image : null;
    const idBun = filterBun ? filterBun.id : null;

    const filteredIngredients = products.filter((ingredient) => ingredient.type === 'sauce' || ingredient.type === 'main')


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

        <section className={styles.constructor}>

            <div id={idBun} onClick={onOpenModal} className={styles.buns}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={imgBun}
                />
            </div>
            <div className={styles.wrapper}>

                {filteredIngredients.map((ingredient) => {

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
                }
            </div>
            <div id={idBun} onClick={onOpenModal} className={styles.buns}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={imgBun}
                />
            </div>
            <div className={styles.order}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">600</p>
                    <div className={styles.icon}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div onClick={onOpenModal} >
                    <Button htmlType="button" type="primary" size="large">
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
    products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,


}


export default BurgerConstructor