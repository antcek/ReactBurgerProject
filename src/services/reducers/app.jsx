import {
  ALL_INGREDIENTS_REQUEST,
  ALL_INGREDIENTS_SUCCESS,
  ALL_INGREDIENTS_FAILED
} from '../actions/app.jsx';


const initialState = {

  productsRequest: false,
  productsFailed: false,
  products: []

}

export const getProducts = (state = [initialState], action) => {

  switch (action.type) {

    case ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        productsRequest: true,
        productsFailed,
      }
    };

    case ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        productsRequst: false,
        products
      }
    }


    case ALL_INGREDIENTS_FAILED: {
      return {
        ...state,
        productsRequest: false,
        productsFailed:true,
      };
    }



        default: {
      return state
    }


  }


}