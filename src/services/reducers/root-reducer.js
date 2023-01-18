import { combineReducers } from 'redux';
import { getProductsReducer } from './app';
import { orderNumberReducer } from './order-details';
import { ingredientDetailsReducer } from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';


export const rootReducer = combineReducers({

    getProducts: getProductsReducer,
    orderNumber: orderNumberReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
})