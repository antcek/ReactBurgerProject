import { burgerConstructorReducer, initialConstructorState } from "./burger-constructor";
import * as type from '../actions/burger-constructor';

describe('burgerConstructorReducer', () => {

  it('Должно вернуть начальное состояние', () => {

    expect(burgerConstructorReducer(initialConstructorState, {})).toEqual(
      {
        ingredients: [],
        buns: []
      }
    )
  })

  it('Должно обработать SET_CONSTRUCTOR_INGREDIENT', () => {

    const action = {
      type: type.SET_CONSTRUCTOR_INGREDIENT,
      ingredients: {
        product: {
        },
      },
      key: 12
    }

    expect(burgerConstructorReducer(initialConstructorState, action)).toEqual({

      ...initialConstructorState,
      ingredients: [...initialConstructorState.ingredients,
      { ...action.ingredients.product, key: action.key }]
    })
  })

  it('Должно обработать SET_CONSTRUCTOR_BUN', () => {

    const action = {
      type: type.SET_CONSTRUCTOR_BUN,
      buns: {
        product: {
        },
      },
    }

    expect(burgerConstructorReducer(initialConstructorState, action)).toEqual({

      ...initialConstructorState,
      buns: [action.buns.product]
    })
  })

  it('Должно обработать DELETE_CONSTRUCTOR_INGREDIENT', () => {

    const initialState = {
      ingredients: [
        {},
        {},
        {},
      ],
      buns: []
    }

    const action = {
      type: type.DELETE_CONSTRUCTOR_INGREDIENT,
      id: 0
    }

    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ingredients: [
        {},
        {},
      ],
      buns: []
    })
  })

  it('Должно обработать SORT_CONSTRUCTOR_INGREDIENT', () => {
    const previousState = {
      ...initialConstructorState,
      ingredients: [{ id: 1, name: 'product1' }, { id: 2, name: 'product2' }],
    };

    const action = {
      type: type.SORT_CONSTRUCTOR_INGREDIENT,
      ingredients: [{ id: 2, name: 'product2' }, { id: 1, name: 'product1' }],
    };

    expect(burgerConstructorReducer(previousState, action)).toEqual({
      ...previousState,
      ingredients: action.ingredients,
    });
  });

})