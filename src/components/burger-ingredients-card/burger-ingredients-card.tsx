import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../services/types/hooks';
import React, { FC } from 'react';
import { IIngredientType } from '../../services/types/types';

interface IIngredientCard {
    onOpenModal: (event?: any) => void;
    product: IIngredientType;
}

const IngredientCard: FC<IIngredientCard> = (({ onOpenModal, product }) => {

    const productType = product.type === 'bun' ? 'bun' : 'ingredients';

    const [{ isDrag }, dragRef] = useDrag({

        type: productType,
        item: { product },
        collect: monitor => ({

            isDrag: monitor.isDragging()
        })

    });

    const draggedBuns = useSelector((store) => store.burgerConstructor.buns);
    const draggedIngredients = useSelector((store) => store.burgerConstructor.ingredients)

    const setBunsCount = () => (draggedBuns.length * 2);
    const setIngredientCount = () => (draggedIngredients.filter((item: IIngredientType) => item.name === product.name).length);

    const cardClasses = `${styles.card} ${isDrag ? styles.dragging : ''}`;

    return (
        <div onClick={onOpenModal}
            id={product._id}
            className={`${cardClasses}`}
            key={product._id}
            data-testid="product"
        >

            {draggedBuns.map((item: IIngredientType) => item.name === product.name ?
                <Counter key={item._id} count={setBunsCount()} size="default" extraClass="m-1" />
                : null)}

            {draggedIngredients.map((item: IIngredientType, index: number) => item.name === product.name ?
                <Counter key={index} count={setIngredientCount()} size="default" extraClass="m-1" />
                : null)}

            <img ref={dragRef} className={styles.previewImage} src={product.image} alt='картинка' />
            <div className={styles.cardBody}>
                <p className="text text_type_digits-default">{product.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
                {product.name}
            </p>
        </div>
    );
})


export default IngredientCard