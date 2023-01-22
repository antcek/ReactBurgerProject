import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import PropTypes from 'prop-types';
import ingredientTypes from '../../prop-types/prop-types.jsx';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function IngredientCard({ onOpenModal, product }) {

    const productType = product.type === 'bun' ? 'bun' : 'ingredients';
    
    const [, dragRef] = useDrag({

        type: productType,
        item: { product },
        collect: monitor => ({

            isDrag: monitor.isDragging()
        })

    });

    const draggedBuns = useSelector(store => store.burgerConstructor.buns);
    const draggedIngredients = useSelector(store => store.burgerConstructor.ingredients)
  
    const setBunsCount = () => (draggedBuns.length * 2);

    const setIngredientCount = () => (draggedIngredients.filter(item => item.name === product.name).length);
   

    return (

        <div  ref={dragRef} onClick={onOpenModal}
            id={product._id}
            className={styles.card}
            key={product._id}
            
        >
            {draggedBuns.map(item => item.name === product.name ? <Counter key={item._id} count={setBunsCount()} size="default" extraClass="m-1" />
                : null)
            }

            {draggedIngredients.map((item, index) => item.name === product.name ? <Counter key={index} count={setIngredientCount()} size="default" extraClass="m-1" />
                : null)
            }
            <img  src={product.image} alt='картинка' />
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
     product: PropTypes.shape(ingredientTypes).isRequired,
}

export default IngredientCard