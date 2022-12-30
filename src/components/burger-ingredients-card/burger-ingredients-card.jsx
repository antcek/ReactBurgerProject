import React from 'react';
import { ingredients } from '../../utils/data';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';



function IngredientCard(props) {
    return (
        <div>
            {props.ingredients.map((product, index) => {

                return (<div className={styles.card} key={index}>

                    <img src={props.ingredients[index].image} />
                    <div className={styles.cardBody}>
                        <p className="text text_type_digits-default">{props.ingredients[index].price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    {/* <Counter count={0} size="default" extraClass="m-1" /> */}
                    <p className="text text_type_main-default">
                        {props.ingredients[index].name}
                    </p>

                </div>)
            })}
        </div>

    );
}

export default IngredientCard