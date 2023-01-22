import {
  ALL_INGREDIENTS_REQUEST,
  ALL_INGREDIENTS_SUCCESS,
  ALL_INGREDIENTS_FAILED
} from '../actions/app';


const initialState = {

  productsRequest: false,
  productsFailed: false,
  products: []

}

export const getProductsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        productsRequest: true,

      }
    }

    case ALL_INGREDIENTS_SUCCESS: {

      return {
        ...state,
        productsRequest: false,
        products: action.products

      }
    }


    case ALL_INGREDIENTS_FAILED: {
      return {
        ...state,
        productsRequest: false,
        productsFailed: true
      };
    }

    default: {
      return state
    }


  }


}