import React, { useState, useRef, useMemo, FC } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCard from '../burger-ingredients-card/burger-ingredients-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useModalData } from '../../services/custom-hooks/custom-hooks';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { SCROLL_DURATION } from '../../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { IIngredientType } from '../../services/types/types';

const BurgerIngredients: FC = () => {

    const dispatch = useDispatch();
    useModalData();

    const products = useSelector((store) => store.getProducts.products);
    const modalVisible = useSelector((store) => store.ingredientDetails.visible);
    const currentIngredient = useSelector((store) => store.ingredientDetails.current);

    const [current, setCurrent] = useState<string>('Булки');

    const buns = useMemo(() => {
        return products?.filter((ingredient: IIngredientType) => ingredient.type === 'bun');
    }, [products])

    const main = useMemo(() => {
        return products?.filter((ingredient: IIngredientType) => ingredient.type === 'main');
    }, [products]);

    const sauce = useMemo(() => {
        return products?.filter((ingredient: IIngredientType) => ingredient.type === 'sauce');
    }, [products]);

    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const scrollNavigation = () => {

        if (containerRef.current && bunRef.current && sauceRef.current && mainRef.current) {

            if (Math.abs(bunRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect()?.top)
                < Math.abs(sauceRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect()?.top)) {
                setCurrent('Булки');
            }

            else setCurrent('Соусы');

            if (Math.abs(mainRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
                < Math.abs(sauceRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)) {
                setCurrent('Начинки');
            };
        }
    }

    function onOpenModal(event: React.MouseEvent<HTMLElement>): void {

        const currentTarget = event.currentTarget;
        const targetProduct = products?.find((product: IIngredientType) => product?._id === currentTarget?.getAttribute('id'))

        if (targetProduct) {
            navigate(`/ingredients/${targetProduct?._id}`)
            localStorage.setItem('modalData', JSON.stringify(targetProduct));
        }
        else if ((event.target as HTMLElement).closest('.constructor-element__action')) { return }

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: targetProduct,
            visible: true,
        })

    };
    function onCloseModal(): void {

        localStorage.removeItem('modalData');

        navigate('/')

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false
        });
    }

    return (

        <section className={styles.ingredients} >
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1 >
            <div className={styles.tabs} >
                <Link
                    to='ingredients-buns'
                    spy={true}
                    smooth={true}
                    duration={SCROLL_DURATION}
                    containerId='ingredients-container'
                >
                    <Tab onClick={() => setCurrent('Булки')} value="Булки" active={current === 'Булки'} >
                        Булки
                    </Tab>
                </Link>
                <Link
                    to='ingredients-sauces'
                    spy={true}
                    smooth={true}
                    duration={SCROLL_DURATION}
                    containerId='ingredients-container'

                >
                    <Tab onClick={() => setCurrent('Соусы')} value="Соусы" active={current === 'Соусы'}>
                        Соусы
                    </Tab>
                </Link>
                <Link
                    to='ingredients-main'
                    spy={true}
                    smooth={true}
                    duration={SCROLL_DURATION}
                    containerId='ingredients-container'
                >
                    <Tab onClick={() => setCurrent('Начинки')} value="Начинки" active={current === 'Начинки'} >
                        Начинки
                    </Tab>
                </Link>
            </div>

            <div id='ingredients-container' ref={containerRef} onScroll={scrollNavigation} className={styles.container} >
                <p id='ingredients-buns' ref={bunRef} className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={styles.wrapper}>

                    {buns?.map((product: IIngredientType) =>
                        <IngredientCard  key={product._id} product={product} onOpenModal={onOpenModal} />
                    )}

                </div>
                <p id='ingredients-sauces' ref={sauceRef} className="text text_type_main-medium mt-10">
                    Соусы
                </p>
                <div className={styles.wrapper} >
                    {sauce?.map((product: IIngredientType) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>
                <p id='ingredients-main' ref={mainRef} className="text text_type_main-medium mt-10">
                    Начинки
                </p>
                <div className={styles.wrapper}>
                    {main?.map((product: IIngredientType) => <IngredientCard key={product._id} product={product} onOpenModal={onOpenModal} />)}
                </div>

            </div>
            <AnimatePresence>
                {modalVisible && currentIngredient &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Modal onCloseModal={onCloseModal}>
                            {<IngredientDetails />}
                        </Modal>
                    </motion.div>}
            </AnimatePresence>
        </section>

    )
}


export default BurgerIngredients;