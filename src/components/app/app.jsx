import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import React, { useEffect } from 'react';
import { getIngredients } from '../../services/thunk-actions/thunk-actions';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { Error404Page } from '../../pages/not-found/not-found';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilPage } from '../../pages/profile/profile';
import Cookies from 'js-cookie';
import { userGetData } from '../../services/thunk-actions/thunk-actions';
import ProtectedRouteElement from '../protected-route/protected-route';


function App() {

    const dispatch = useDispatch();
    const productsFailed = useSelector((store) => store.getProducts.productsFailed);
    let accessToken = Cookies.get('accessToken');

    useEffect(() => {

        dispatch(getIngredients());

        if (accessToken) {
            dispatch(userGetData());
        }

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
                        <Route path='/profile' 
                        element={<ProtectedRouteElement element={<ProfilPage />} />} />
                        <Route path="/" element={<> <AppHeader />
                            <main>
                                <div className={styles.sections}>
                                    <DndProvider backend={HTML5Backend}>
                                        <BurgerIngredients />
                                        <BurgerConstructor />
                                    </DndProvider>
                                </div>
                            </main>
                        </>} />
                        <Route path='*' element={<Error404Page />} />
                    </Routes>
                </Router>

            }
        </>
    )
}

export default App