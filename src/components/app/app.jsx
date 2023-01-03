import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import styles from './app.module.css';
import { React, useEffect, useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details'

function App() {

    const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState();

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

    function onOpenModal(event) {
        let target = event.target;
        console.log(target.closest('div'))
        setModalContent(<IngredientDetails target={target} products={products} onCloseModal={onCloseModal} />)


        setVisible(true);

    }

    function onCloseModal() {

        setVisible(false)

    }

    return (

        <div className={styles.container}>

            <AppHeader />
            <main>
                <div className={styles.sections}>
                    <BurgerIngredients onOpenModal={onOpenModal} products={products} />
                    <BurgerConstructor onOpenModal={onOpenModal} products={products} />
                </div>
            </main>
            {visible && <Modal onCloseModal={onCloseModal} >
                {modalContent}
            </Modal>}
        </div>

    );
}

export default App