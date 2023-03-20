import { ingredientDetailsReducer, initialState } from "./ingredient-details";
import * as type from '../actions/ingredient-details';

describe('ingredientDeatilsReducer', () => {

  it('Должно возвращать начальное состояние', () => {

    expect(ingredientDetailsReducer(initialState, {})).toEqual({
      current: null,
      visible: false,
      targetOrder: null,
    })
  })

  it('Должно обрабатывать CURRENT_INGREDIENT_DETAILS', () => {

    const earlierState = {
      ...initialState,
      visible: false,
    }

    const action = {
      type: type.CURRENT_INGREDIENT_DETAILS,
      product: [],
      visible: true
    }

    expect(ingredientDetailsReducer(earlierState, action)).toEqual({

      ...earlierState,
      current: action.product,
      visible: action.visible,
    })
  })

  it('Должно обрабатывать CURRENT_INGREDIENTS_DETAILS_MODAL', () => {

    const earlierState = {
      ...initialState,
      visible: false,
    }

    const action = {
      type: type.CURRENT_INGREDIENTS_DETAILS_MODAL,
      visible: true
    }

    expect(ingredientDetailsReducer(earlierState, action)).toEqual({

      ...earlierState,
      visible: action.visible,
    })
  })

  it('Должно обрабатывать FEED_MODAl_DETAILS', () => {

    const earlierState = {
      ...initialState,
      visible: false,
    }

    const action = {
      type: type.FEED_MODAl_DETAILS,
      visible: true,
      targetOrder: {}
    }

    expect(ingredientDetailsReducer(earlierState, action)).toEqual({

      ...earlierState,
      visible: action.visible,
      targetOrder: action.targetOrder,
    })
  })

  it('Должно обрабатывать PERSONAL_MODAL_DETAILS', () => {

    const earlierState = {
      ...initialState,
      visible: false,
    }

    const action = {
      type: type.PERSONAL_MODAL_DETAILS,
      visible: true,
    }

    expect(ingredientDetailsReducer(earlierState, action)).toEqual({

      ...earlierState,
      visible: action.visible,

    })
  })

})