import { orderNumberReducer, initialState } from "./order-details";
import * as type from '../actions/order-details';

describe('orderDeatilsReducer', () => {

  it('Должно возвращать начальное состояние', () => {

    expect(orderNumberReducer(initialState, {})).toEqual({
      orderRequest: false,
      orderFailed: false,
      orderNumber: null,
    })
    
  })

  it('Должно обрабатывать ORDER_REQUEST', () => {

    const action = {
      type: type.ORDER_REQUEST
    }

    expect(orderNumberReducer(initialState, action)).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,

    })
  })

  it('Должно обрабатывать ORDER_SUCCESS', () => {
     
    const earlierState = {
      ...initialState,
      orderRequest: true,
    }

    const action = {
      type: type.ORDER_SUCCESS,
      orderNumber: 444445
    }

    expect(orderNumberReducer(earlierState, action)).toEqual({
      ...earlierState,
      orderRequest: false,
      orderNumber: action.orderNumber,
      orderFailed: false,
      
    })
  })

  it('Должно обрабатывать ORDER_FAILED', () => {
     
    const earlierState = {
      ...initialState,
      orderRequest: true,
    }

    const action = {
      type: type.ORDER_FAILED,
    }

    expect(orderNumberReducer(earlierState, action)).toEqual({
      ...earlierState,
      orderFailed: true,
      orderRequest: false
      
    })
  })


})