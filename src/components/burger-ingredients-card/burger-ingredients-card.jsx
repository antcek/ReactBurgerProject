
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function IngredientCard({ onOpenModal, product }) {
   
    // const products = useSelector(store => store.getProducts.products);
    const itemId = product._id;
    const productType = product.type === 'bun' ? 'buns' : 'ingredients';
    
    const [{ isDrag }, dragRef] = useDrag({
        
        type: productType,
        item: { itemId },
        collect: monitor => ({
            
            isDrag: monitor.isDragging()
        })
    });

   
    return (

                <div onClick={onOpenModal}
                    id={product._id}
                    className={styles.card}
                    key={product._id}
                    ref={dragRef}>

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
                </div>
        


    );
}

IngredientCard.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    // category: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,
}

export default IngredientCard