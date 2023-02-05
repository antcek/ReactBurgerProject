import React from 'react';
import { DELETE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burger-constructor';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor-ingredients.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ingredientTypes from '../../prop-types/prop-types';

export default function DraggedIngredientCard({ onOpenModal, ingredient, index, moveIngredient }) {

    const [{ isDragging }, sortedDrag] = useDrag({
        type: 'sort-ingredients',
        item: { index },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),

    });


    const [, sortedDrop] = useDrop({
        accept: 'sort-ingredients',
      
        hover: (item, monitor) => {
     
            const draggedIndex = item.index;
            const hoverIndex = index;
            if (monitor.didDrop()) return;

            moveIngredient(draggedIndex, hoverIndex);
            item.index = hoverIndex;
        },
      
    });


    const refIng = useRef(null);
    const dispatch = useDispatch();

    const ingredientIsDrag = `${styles.main} ${isDragging ? styles.dragging : ''} `
    

    return (
        
        <div ref={sortedDrop} >
           
                 
            <div ref={sortedDrag} className={styles.ingredientsContainer}>
                <div>
                    <DragIcon />
                </div>
               
                <div ref={refIng} id={ingredient._id} onClick={onOpenModal} className={ingredientIsDrag}>
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

DraggedIngredientCard.propTypes = {

    onOpenModal: PropTypes.func.isRequired,
    ingredient: PropTypes.shape(ingredientTypes).isRequired,
    index: PropTypes.number.isRequired,
    moveIngredient: PropTypes.func.isRequired,

}