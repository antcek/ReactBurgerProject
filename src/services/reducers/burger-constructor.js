import { BURGER_CONSTRUCTOR_ELEMENT, SET_CONSTRUCTOR_ELEMENT } from "../actions/burger-constructor";

const initialState = {

    ingredient: [],
    container: ''

}

export const burgerConstructorReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CONSTRUCTOR_ELEMENT: {

            return {
                ...state,
               ingredient: action.ingredient
               

            };
        }

        case BURGER_CONSTRUCTOR_ELEMENT: {
            return {
                ...state,
                ingredient: state.ingredient.filter((elem) => elem._id === action._id ),
                container: action.container

            };
        }

        default: {
            return state
        }
    }
}