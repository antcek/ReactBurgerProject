
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function IngredientCard(props) {

    return (

        props.category.map((product) => {

            return (
                <div onClick={props.onOpenModal} id={product._id} className={styles.card} key={product._id}>
                    {product.name === 'Краторная булка N-200i' ? <Counter count={1} size="default" extraClass="m-1" /> :
                        product.name === 'Соус традиционный галактический' ? <Counter count={1} size="default" extraClass="m-1" /> : null}
                    <img src={product.image} />
                    <div className={styles.cardBody}>
                        <p className="text text_type_digits-default">{product.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>

                    <p className="text text_type_main-default">
                        {product.name}
                    </p>

                </div>)
        })


    );
}

IngredientCard.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    category: PropTypes.array.isRequired,
}

export default IngredientCard