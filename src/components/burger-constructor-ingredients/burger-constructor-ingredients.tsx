import React, { FC } from 'react';
import { DELETE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burger-constructor';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor-ingredients.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredientType } from '../../services/types/types';

type TItemDrop = {
    index: number;
}

interface IDraggedIngredientCardProps {

    onOpenModal: (event: React.MouseEvent<HTMLDivElement>) => void;
    ingredient: IIngredientType;
    index: number;
    moveIngredient: (arg1: number, arg2: number) => void;
}

const DraggedIngredientCard: FC<IDraggedIngredientCardProps> = ({ onOpenModal, ingredient, index, moveIngredient }) => {

    const [{ isDragging }, sortedDrag] = useDrag({
        type: 'sort-ingredients',
        item: { index },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),

    });

    const [, sortedDrop] = useDrop({
        accept: 'sort-ingredients',

        hover: (item: TItemDrop, monitor) => {

            const draggedIndex = item.index;
            const hoverIndex = index;
            if (monitor.didDrop()) return;

            moveIngredient(draggedIndex, hoverIndex);
            item.index = hoverIndex;
        },

    });

    const dispatch = useDispatch();
    const ingredientIsDrag = `${styles.main} ${isDragging ? styles.dragging : ''}`;

    return (

        <div ref={sortedDrop} >
            <div ref={sortedDrag} className={styles.ingredientsContainer}>
                <div>
                    <DragIcon type='primary' />
                </div>
                <div id={ingredient._id} onClick={onOpenModal} className={ingredientIsDrag}>
                    <ConstructorElement
                        handleClose={() =>
                            dispatch({
                                type: DELETE_CONSTRUCTOR_INGREDIENT,
                                id: index
                            })
                        }
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                </div>
            </div>
        </div>

    )
}


export default DraggedIngredientCard;