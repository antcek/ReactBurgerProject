
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';

function IngredientCard({ onOpenModal, category }) {

    return (

        category.map((product) => {

            return (
                <div onClick={onOpenModal} id={product._id} className={styles.card} key={product._id}>
                    {  /*ХАРДКОД СЧЕТЧИКИ {product.name === 'Краторная булка N-200i' ? <Counter count={1} size="default" extraClass="m-1" /> :
                        product.name === 'Соус традиционный галактический' ? <Counter count={1} size="default" extraClass="m-1" /> : null} */}
                    <img src={product.image} alt='картинка' />
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
    category: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,
}

export default IngredientCard