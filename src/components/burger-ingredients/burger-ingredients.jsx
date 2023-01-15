import React, { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProductsContext } from '../../utils/products-context.js';


function BurgerIngredients() {

    const products = useContext(ProductsContext);

    const [current, setCurrent] = React.useState('Булки');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const buns = products.filter(ingredient => ingredient.type === 'bun');
    const main = products.filter(ingredient => ingredient.type === 'main');
    const sauce = products.filter(ingredient => ingredient.type === 'sauce');

    const categoryChange =  (value) => {

        const ingredientsContainer = document.querySelector(`.${styles.container}`);
        const scrollBun = document.getElementById('bun').getBoundingClientRect().top;
        const scrollMain = document.getElementById('main').getBoundingClientRect().top;
        const scrollSauce = document.getElementById('sauce').getBoundingClientRect().top;

        setCurrent(value);

        const scrollCategory = () => {

            if (value === 'Булки') {

                return (scrollBun - ingredientsContainer.getBoundingClientRect().top)
            }

            else if (value === 'Соусы') {
                return (scrollSauce - ingredientsContainer.getBoundingClientRect().top)
            }

            else if (value === 'Начинки') {
                return (scrollMain - ingredientsContainer.getBoundingClientRect().top)
            }
        };

        ingredientsContainer.scrollBy(0, scrollCategory())

    };

    function onOpenModal(event) {

        let currentTarget = event.currentTarget;

        setModalContent(<IngredientDetails currentTarget={currentTarget} products={products} onCloseModal={onCloseModal} />);
        setModalVisible(true)
    };

    function onCloseModal() {
        setModalVisible(false)
    };

    return (
        <section className={styles.ingredients} >
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >

                <div style={{ display: 'flex' }}>

                    <Tab value="Булки" active={current === 'Булки'} onClick={categoryChange}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={categoryChange}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={categoryChange}>
                        Начинки
                    </Tab>

                </div>
            </div>
            <div className={styles.container} >
                <p id="bun" className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    <IngredientCard onOpenModal={onOpenModal} category={buns} />
                </div>
                <p id="sauce" className="text text_type_main-medium mt-10">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    <IngredientCard onOpenModal={onOpenModal} category={sauce} />
                </div>
                <p id="main" className="text text_type_main-medium mt-10">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    <IngredientCard onOpenModal={onOpenModal} category={main} />
                </div>
            </div>

            {modalVisible && <Modal onCloseModal={onCloseModal}>
                {modalContent}
            </Modal>}
        </section>

    )
}

BurgerIngredients.propTypes = {
    // products: PropTypes.arrayOf(PropTypes.shape(ingredientTypes)).isRequired,

}

export default BurgerIngredients;