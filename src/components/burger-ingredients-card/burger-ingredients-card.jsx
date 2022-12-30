import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function IngredientCard(props) {
    return (

        props.category.map((product, index) => {

            return (<div className={styles.card} key={product._id}>

                <img src={props.category[index].image} />
                <div className={styles.cardBody}>
                    <p className="text text_type_digits-default">{props.category[index].price}</p>
                    <CurrencyIcon type="primary" />
                </div>

                <p className="text text_type_main-default">
                    {props.category[index].name}
                </p>

            </div>)
        })


    );
}

IngredientCard.propTypes = {
    category: PropTypes.array
}

export default IngredientCard