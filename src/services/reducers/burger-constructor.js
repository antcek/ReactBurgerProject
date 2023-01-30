
import {
    SET_CONSTRUCTOR_INGREDIENT,
    DELETE_CONSTRUCTOR_INGREDIENT,
    SET_CONSTRUCTOR_BUN,
    SORT_CONSTRUCTOR_INGREDIENT
} from "../actions/burger-constructor";

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
                { ...action.ingredients.product, key: action.key }]

            };
        }
        case SET_CONSTRUCTOR_BUN: {

            return {
                ...state,
                buns: [action.buns.product]
            }
        }
        case DELETE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,

                ingredients: state.ingredients.filter((ingredient, index) => index !== action.id)
            }
        }

        case SORT_CONSTRUCTOR_INGREDIENT: {



            return {
                ...state,

                ingredients: action.ingredients


            }
        }

        default: {
            return state


        }
    }
}