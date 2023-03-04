import {
  ALL_INGREDIENTS_REQUEST,
  ALL_INGREDIENTS_SUCCESS,
  ALL_INGREDIENTS_FAILED,
  TAllIngredientsActions
} from '../actions/app';
import { IIngredientType } from '../types/types';

interface IInitialAppState {
  productsRequest: boolean;
  productsFailed: boolean;
  products: readonly IIngredientType[] | undefined ;
}

const initialAppState: IInitialAppState = {

  productsRequest: false,
  productsFailed: false,
  products: [],

}

export const getProductsReducer = (state = initialAppState, action: TAllIngredientsActions): IInitialAppState => {

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