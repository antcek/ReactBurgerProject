import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import styles from './app.module.css';
import { React, useEffect, useState } from 'react';


function App() {

    const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await fetch(apiIngredients);
                const ingredients = await response.json();

                setProducts(...products, ingredients.data);
            } catch (err) {
                console.log(err)
            }
        };

        getData()

    }, []);


    return (

        <div className={styles.container}>

            <AppHeader />
            <main>
                <div className={styles.sections}>
                    <BurgerIngredients products={products} />
                    <BurgerConstructor products={products} />
                </div>
            </main>
        </div>

    );
}

export default App