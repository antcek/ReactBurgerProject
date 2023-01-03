import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {

    const filterBun = props.products.find((bun) => bun.name === "Краторная булка N-200i");
    const imgBun = filterBun ? filterBun.image : null;
    const idBun = filterBun ? filterBun._id : null;


    return (

        <section className={styles.constructor}>
            <div id={idBun} onClick={props.onOpenModal} className={styles.buns}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={imgBun}
                />
            </div>
            <div className={styles.wrapper} >
                {props.products.map((ingredient) => {

                    if (ingredient.type === 'sauce' || ingredient.type === 'main') {
                        return (
                            <div id={ingredient._id} onClick={props.onOpenModal} key={ingredient._id} className={styles.main} >
                                <DragIcon />
                                <ConstructorElement

                                    type={undefined}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}

                                />
                            </div>
                        )
                    }

                })}
            </div>
            <div id={idBun} onClick={props.onOpenModal} className={styles.buns}>
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
                <div onClick={props.onOpenModal} >
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })).isRequired,

    onOpenModal: PropTypes.func.isRequired,

}


export default BurgerConstructor