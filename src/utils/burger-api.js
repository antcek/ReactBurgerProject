import {
    ALL_INGREDIENTS_SUCCESS,
    ALL_INGREDIENTS_REQUEST,
    ALL_INGREDIENTS_FAILED
} from "../services/actions/app";
import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST } from "../services/actions/order-details";



export function getIngredients() {

    return async function (dispatch) {

        dispatch({
            type: ALL_INGREDIENTS_REQUEST
        });

        const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';

        try {
            const response = await fetch(apiIngredients);

            if (response && response.ok) {
                const ingredients = await response.json();

                dispatch({
                    type: ALL_INGREDIENTS_SUCCESS,
                    products: ingredients.data
                })

            }
            else dispatch({
                type: ALL_INGREDIENTS_FAILED
            })

        } catch (err) {

            dispatch({
                type: ALL_INGREDIENTS_FAILED
            })

        }
    }

};


export function sendOrder() {

    return async function (dispatch) {

        dispatch({
            type: ORDER_REQUEST
        });

        const constructorElem = document.getElementById('constructor');
        const idNodeElements = constructorElem.querySelectorAll('[id]');
        const idConstructor = { ingredients: Array.from(idNodeElements).map(ingredient => ingredient.id) };

        try {

            const response = await fetch('https://norma.nomoreparties.space/api/orders',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(idConstructor),
                });

            if (response && response.ok) {

                const result = await response.json();

                dispatch({
                    type: ORDER_SUCCESS,
                    orderNumber: result.order.number
                });

            }
            else {
                dispatch({
                    type: ORDER_FAILED
                })
            }
        } catch (err) {

            dispatch({
                type: ORDER_FAILED
            })
        }
    }
}



