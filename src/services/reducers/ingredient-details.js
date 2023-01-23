import { CURRENT_INGREDIENT_DETAILS } from '../actions/ingredient-details';


const initialState = {

    current: null,
    visible: false,
}

export const ingredientDetailsReducer = (state = initialState, action) => {

    switch (action.type) {

        case CURRENT_INGREDIENT_DETAILS: {

            return {
                ...state,
                current: action.product,
               visible: action.visible,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }


}