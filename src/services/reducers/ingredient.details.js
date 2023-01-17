import { CURRENT_INGREDIENT_DETAILS } from '../actions/ingredient-details';


const initialState = {

    current: []
}

export const ingredientDetailsReducer = (state = initialState, action) => {

    switch (action.type) {

        case CURRENT_INGREDIENT_DETAILS: {

            return {
                ...state,
                current: action.product
            }
        }

        default: {
            return {
                state
            }
        }
    }


}