import { BURGER_CONSTRUCTOR_ELEMENT, SET_CONSTRUCTOR_ELEMENT } from "../actions/burger-constructor";

const initialState = {

    ingredients: [ {container: ''}]

}

export const burgerConstructorReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CONSTRUCTOR_ELEMENT: {

            return {
                ...state,
                ingredients: action.ingredients.map(ingredient => ({...ingredient,container:action.container}))


            };
        }

        case BURGER_CONSTRUCTOR_ELEMENT: {
            return {
                ...state,

                ingredients: state.ingredients.map(elem => elem._id === action.id 
                    ? 
                    { ...elem, container: action.container }
                        : elem
                        )

            };
        }

        default: {
            return state
        }
    }
}