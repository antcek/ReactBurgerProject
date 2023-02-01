import { combineReducers } from 'redux';
import { getProductsReducer } from './app';
import { orderNumberReducer } from './order-details';
import { ingredientDetailsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';
import {recoverPasswordReducer} from './forgot-password';
import {resetPasswordReducer} from './reset-password';
import {setActiveReducer} from './app-header';
import { registerUserReducer } from './register';
import { loginUserReducer } from './user';

export const rootReducer = combineReducers({

    getProducts: getProductsReducer,
    orderNumber: orderNumberReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    recoverPassword: recoverPasswordReducer,
    resetPassword: resetPasswordReducer,
    setActive: setActiveReducer,
    registerUser: registerUserReducer,
    loginUser: loginUserReducer,
})