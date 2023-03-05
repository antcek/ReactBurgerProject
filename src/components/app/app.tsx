import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import React, { useEffect, FC } from 'react';
import { getIngredients } from '../../services/thunk-actions/thunk-actions';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { Error404Page } from '../../pages/not-found/not-found';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilPage } from '../../pages/profile/profile';
import Cookies from 'js-cookie';
import { userGetData } from '../../services/thunk-actions/thunk-actions';
import ProtectedRouteElement from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsPage } from '../../pages/ingredients/ingredients';
import { CURRENT_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import Modal from '../modal/modal';
import { OrderPage } from '../../pages/orders/orders';
import { FeedPage } from '../../pages/feed/feed';
import { FeedDetailsPage } from '../../pages/feed-details-page/feed-details-page';
import { CreatedOrderDetails } from '../created-order-details/created-order-details';



const App: FC = () => {

    const dispatch = useDispatch();
    let accessToken = Cookies.get('accessToken');

    const productsFailed = useSelector((store) => store.getProducts.productsFailed);
    const detailsVisible = useSelector((store) => store.ingredientDetails.visible);

    function onCloseModal(): void {
        localStorage.removeItem('modalData');

        dispatch({
            type: CURRENT_INGREDIENT_DETAILS,
            product: null,
            visible: false
        });
    };

    useEffect(() => {

        dispatch(getIngredients());

        if (accessToken) {
            dispatch(userGetData());
        };

    }, [accessToken, dispatch]);


    return (
        <>
            {productsFailed ?
                <div className={styles.error}>
                    Произошла ошибка при загрузке товаров, попробуйте обновить страницу
                </div> :
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                        <Route path='/reset-password' element={<ResetPasswordPage />} />
                        <Route path='/profile' element={<ProtectedRouteElement element={<ProfilPage />} />} />
                        <Route path='/profile/orders' element={<ProtectedRouteElement element={<OrderPage />} />} />
                        <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<FeedDetailsPage />} />} />
                        <Route path="/" element={<> <AppHeader />
                            <main>
                                <div className={styles.sections}>
                                    <DndProvider backend={HTML5Backend}>
                                        <BurgerIngredients />
                                        <BurgerConstructor />
                                    </DndProvider>
                                </div>
                            </main>
                        </>} >
                            {detailsVisible && <Route path='/ingredients/:id'
                                element={<Modal onCloseModal={onCloseModal}>
                                    <IngredientDetails />
                                </Modal>} />}
                        </Route>
                        <Route path='/feed' element={<FeedPage />} />
                        {detailsVisible && <Route path='/feed/:id'element={
                                <Modal onCloseModal={onCloseModal}>
                                 <CreatedOrderDetails/>
                                </Modal>} />}
                        
                        <Route path='/feed/:id' element={<FeedDetailsPage />} />

                        <Route path='*' element={<Error404Page />} />
                        <Route path='/ingredients' element={<IngredientsPage />} >
                            <Route path=':id'
                                element={<IngredientDetails />} />
                        </Route>

                    </Routes>
                </Router>
            }
        </>
    )
}

export default App