import { BURGER_CONSTRUCTOR_ELEMENT } from "../actions/burger-constructor";

const initialState = {

    ingredient: []
}

export const burgerConstructorReducer = (state = initialState, action) => {

    switch (action.type) {

        case BURGER_CONSTRUCTOR_ELEMENT: {

            return {
                ...state,
               ingredient: action.ingredient
            }
        }
    }
}