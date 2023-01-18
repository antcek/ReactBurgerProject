import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import React, { useEffect } from 'react';
import { getIngredients } from '../../utils/burger-api.js';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BURGER_CONSTRUCTOR_ELEMENT } from '../../services/actions/burger-constructor';

function App() {

    const dispatch = useDispatch();
    const { productsFailed } = useSelector((store) => store.getProducts.productsFailed);
    const products = useSelector((store) => store.getProducts.products)
    
    const dropHandler = (itemId) => {
        console.log(itemId)
      
        dispatch({type:BURGER_CONSTRUCTOR_ELEMENT,
            
            ingredient: products.filter(elem => 
                console.log(elem._id === itemId)
           )
        })
    }
    
    


    useEffect(() => {

        dispatch(getIngredients())

    }, [dispatch]);

    return (
        <>
            {productsFailed ? <div className={styles.error}>
                Произошла ошибка, попробуйте перезагрузить страницу
            </div> :

                <div className={styles.container}>
                    <AppHeader />
                    <main>
                        <div className={styles.sections}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor dropHandler={dropHandler} />
                            </DndProvider>
                        </div>
                    </main>
                </div>

            }
        </>
    )
}

export default App