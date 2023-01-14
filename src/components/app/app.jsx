import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import React, { useEffect, useState, } from 'react';
import { getIngredients } from '../../utils/burger-api.js';
import { ProductsContext } from '../../utils/products-context.js';


function App() {

    const [products, setProducts] = useState([]);

    const [error, setError] = useState(false)


    useEffect(() => {

        const getData = async () => {

            const loadedProducts = await getIngredients();

            setProducts(loadedProducts);
            setError(loadedProducts === false)
        }

        getData()

    }, []);

    return (
        <>
            {error ? <div className={styles.error}> Произошла ошибка, попробуйте перезагрузить страницу </div> :
                <div className={styles.container}>
                    <AppHeader />
                    <main>
                        <div className={styles.sections}>

                            <ProductsContext.Provider value={products}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </ProductsContext.Provider>
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default App