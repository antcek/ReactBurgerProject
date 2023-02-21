import { CURRENT_INGREDIENT_DETAILS, CURRENT_INGREDIENTS_DETAILS_MODAL } from '../actions/ingredient-details';


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

        case CURRENT_INGREDIENTS_DETAILS_MODAL: {
            return {
                ...state,
                visible: action.visible
            }
        }
        
        default: {
            return {
                ...state
            }
        }
    }


}