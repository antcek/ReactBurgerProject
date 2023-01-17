import { combineReducers } from 'redux';
import { getProductsReducer } from './app';
import { orderNumberReducer } from './order-details';
import { ingredientDetailsReducer } from './ingredient.details';

export const rootReducer = combineReducers({

    getProducts: getProductsReducer,
    orderNumber: orderNumberReducer,
    ingredientDetails: ingredientDetailsReducer,
})