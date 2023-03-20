import { getProductsReducer, initialAppState } from "./app";
import * as type from '../actions/app';


describe('appReducer', () => {

  const initialAppState = {
    productsRequest: true,
    productsFailed: false,
    products: [],
  }

  it('Должно вернуть начальное состояние', () => {

    expect(getProductsReducer(undefined, {})).toEqual(
      {
        productsRequest: false,
        productsFailed: false,
        products: [],
      }
    )
  })

  it('Должно обрабатывать ALL_INGREDIENTS_REQUEST', () => {

    const action = {
      type: type.ALL_INGREDIENTS_REQUEST,
    }

    expect(getProductsReducer(initialAppState, action)).toEqual({
      ...initialAppState,
      productsRequest: true,
    })

  })

  it('Должно обрабатывать ALL_INGREDIENTS_SUCCESS', () => {

    const earlierState = {
      ...initialAppState,
      productsRequest: true
    };

    const action = {
      type: type.ALL_INGREDIENTS_SUCCESS,
      products: [{}, {}]
    };

    expect(getProductsReducer(earlierState, action)).toEqual({
      ...earlierState,
      productsRequest: false,
      products: action.products
    })

  })

  it('Должно обрабатывать ALL_INGREDIENTS_FAILED', () => {

    const earlierState = {
      ...initialAppState,
      productsRequest: true
    };

    const action = {
      type: type.ALL_INGREDIENTS_FAILED,

    };

    expect(getProductsReducer(earlierState, action)).toEqual({
      ...earlierState,
      productsRequest: false,
      productsFailed: true
    })

  })




})