import {
    CURRENT_INGREDIENT_DETAILS,
    CURRENT_INGREDIENTS_DETAILS_MODAL,
    FEED_MODAl_DETAILS, 
    PERSONAL_MODAL_DETAILS,
    TAllDetailsActions
} from '../actions/ingredient-details';
import { IIngredientType } from '../types/types';



interface IInitialState {
    current: IIngredientType | null;
    visible: boolean;
}

const initialState: IInitialState = {

    current: null,
    visible: false,
}

export const ingredientDetailsReducer = (state = initialState, action: TAllDetailsActions): IInitialState => {

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

        case FEED_MODAl_DETAILS: {

            return {
                ...state,
                visible: action.visible,
            }
        }

        case PERSONAL_MODAL_DETAILS: {
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