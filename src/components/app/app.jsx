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
import { updateToken } from '../../services/thunk-actions/thunk-actions';


function App() {

    const dispatch = useDispatch();
    const productsFailed = useSelector((store) => store.getProducts.productsFailed);
    let refreshToken = localStorage.getItem('refreshToken');
    let accessToken = Cookies.get('accessToken')

    useEffect(() => {

        dispatch(getIngredients());

    }, [dispatch]);

    useEffect(() => { // эта функция написана для того, что б при перезапуске браузера
        // авторизованный пользователь получал новый accessToken(старый слетает)
      
        if (refreshToken && accessToken === undefined) {

            updateToken().then(result => {

                if (result.accessToken.indexOf('Bearer') === 0) {
                    accessToken = result.accessToken.split('Bearer')[1].trim();
                };

                if (accessToken) {
                    Cookies.set('accessToken', accessToken)
                };

                localStorage.setItem('refreshToken', result.refreshToken)
            })
        }
    }, [refreshToken, accessToken])


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
                        <Route path='/profile' element={<ProfilPage />} />
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