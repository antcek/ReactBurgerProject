import { combineReducers } from 'redux';
import { getProductsReducer } from './app';
import { orderNumberReducer } from './order-details';
import { ingredientDetailsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';
import {recoverPasswordReducer} from './forgot-password';
import {resetPasswordReducer} from './reset-password';
import {setActiveReducer} from './app-header';

export const rootReducer = combineReducers({

    getProducts: getProductsReducer,
    orderNumber: orderNumberReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    recoverPassword: recoverPasswordReducer,
    resetPassword: resetPasswordReducer,
    setActive: setActiveReducer,
})