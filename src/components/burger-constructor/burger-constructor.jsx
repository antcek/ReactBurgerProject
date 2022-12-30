import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {

    const img = props.ingredients.find((bun) => bun.name === "Краторная булка N-200i").image;

    return (

        <section className={constructorStyles.constructor}>
            <div className={constructorStyles.buns}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div className={constructorStyles.wrapper} >
                {props.ingredients.map((ingredient) => {

                    if (ingredient.type === 'sauce' || ingredient.type === 'main') {
                        return (
                            <div key={ingredient._id} className={constructorStyles.main} >
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
            <div className={constructorStyles.buns}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div className={constructorStyles.order}>
                <div className={constructorStyles.price}>
                    <p className="text text_type_digits-medium">600</p>
                    <div className={constructorStyles.icon}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>

    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array
}


export default BurgerConstructor