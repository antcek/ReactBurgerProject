import { BURGER_CONSTRUCTOR_ELEMENT, SET_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_ELEMENT, SET_CONSTRUCTOR_BUN } from "../actions/burger-constructor";

const initialState = {

    ingredients: [],
    buns: []

}

export const burgerConstructorReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CONSTRUCTOR_INGREDIENT: {

            return {
                ...state,

                ingredients: [...state.ingredients,
                ...action.ingredients.map(ingredient => ({ ...ingredient.itemId }))]

            };
        }
        case SET_CONSTRUCTOR_BUN: {

            return {
                ...state,
                buns: [
                ...action.buns.map(ingredient => ({ ...ingredient.itemId }))]
            }
        }
        case DELETE_CONSTRUCTOR_ELEMENT: {
            return {
                ingredients: [...state.ingredients].filter((item, index) => index !== action.index)
            }
        }

        default: {
            return state
        }
    }
}