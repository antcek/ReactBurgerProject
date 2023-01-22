import React, {useCallback, useRef, useEffect} from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';


function BurgerIngredients() {

    const dispatch = useDispatch();

    const products = useSelector((store) => store.getProducts.products);

    const [current, setCurrent] = React.useState('Булки');

    const modalVisible = useSelector(store => store.ingredientDetails.visible);

    const currentTarget = useSelector(store => store.ingredientDetails.current);


    const buns = products.filter(ingredient => ingredient.type === 'bun');
    const main = products.filter(ingredient => ingredient.type === 'main');
    const sauce = products.filter(ingredient => ingredient.type === 'sauce');

    const containerRef = useRef(null);
    const bunRef =useRef(null)
    const sauceRef = useRef(null)
    const mainRef = useRef(null)
   
    useEffect(() => {
        
    }, [])
    
    const categoryChange = useCallback( (value) => {
        
        setCurrent(value);

        const scrollCategory = () => {

            if (value === 'Булки') {
                return (bunRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
            }

            else if (value === 'Соусы') {
                return (sauceRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
            }

            else if (value === 'Начинки') {
                return (mainRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
            }
        };
         containerRef.current.scrollBy(0, scrollCategory());
         
    },[bunRef,sauceRef,mainRef,containerRef] );

    const scrollNavigation = () => {

        if (Math.abs(bunRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
            < Math.abs(sauceRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)) {
            setCurrent('Булки');
        }

        else setCurrent('Соусы');

        if (Math.abs(mainRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
            < Math.abs(sauceRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)) {
            setCurrent('Начинки');
        };

    }

    function onOpenModal(event) {

        const currentTarget = event.currentTarget;
        const targetProduct = products.find((product) => product._id === currentTarget.getAttribute('id'))

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: targetProduct,
            visible: true,
        })

    };

    function onCloseModal() {

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false,
        });
    };


    return (
        <section className={styles.ingredients} >
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >
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

            <div ref={containerRef} onScroll={scrollNavigation} className={styles.container} >
                <p ref={bunRef} className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    {buns.map((product) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>
                <p ref={sauceRef} className="text text_type_main-medium mt-10">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    {sauce.map((product) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>
                <p ref={mainRef}  className="text text_type_main-medium mt-10">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    {main.map((product) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>

            </div>

            {modalVisible && <Modal onCloseModal={onCloseModal}>
                {currentTarget ? <IngredientDetails products={products} onCloseModal={onCloseModal} />
                    : <></>}
            </Modal>}
        </section>

    )
}


export default BurgerIngredients;