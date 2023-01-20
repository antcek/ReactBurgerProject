import { SET_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT, SET_CONSTRUCTOR_BUN } from "../actions/burger-constructor";

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
        case DELETE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,

                ingredients: state.ingredients.filter((ingredient, index) => index !== action.id)
            }
        }

        default: {
            return state
        }
    }
}