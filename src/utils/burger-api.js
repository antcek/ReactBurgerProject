import {
    ALL_INGREDIENTS_SUCCESS,
    ALL_INGREDIENTS_REQUEST,
    ALL_INGREDIENTS_FAILED
} from "../services/actions/app";



export async function getIngredients() {

    return async function (dispatch) {

        dispatch({
            type: ALL_INGREDIENTS_REQUEST
        });

        const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';

        try {
            const response = await fetch(apiIngredients);

            if (response && response.ok) {
                const ingredients = await response.json();
                console.log(ingredients)
                dispatch({
                    type: ALL_INGREDIENTS_SUCCESS,
                    products: ingredients.data
                })

            }
            else dispatch({
                type:ALL_INGREDIENTS_FAILED
            })

        } catch (err) {

             dispatch({
                type:ALL_INGREDIENTS_FAILED
            })

        }
    }

};


export async function sendOrder() {


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
            })
        if (response.ok) {

            const result = await response.json();
            return result.order.number;

        };
    } catch (err) {

        return 'Ошибка'
    }

}



