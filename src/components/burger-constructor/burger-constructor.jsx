import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../utils/data.js';
import constructorStyles from './burger-constructor.module.css';


function BurgerConstructor() {

    const img = ingredients.find((bun) => bun.name === "Краторная булка N-200i").image;

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
                {ingredients.map((ingredient) => {

                    if (ingredient.type === 'sauce' || ingredient.type === 'main') {
                        return (
                            <div className={constructorStyles.main}>
                                <DragIcon />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={200}
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

export default BurgerConstructor