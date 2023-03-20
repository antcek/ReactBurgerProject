import { wsReducer, initialState } from "./web-socket";
import * as type from '../actions/web-socket';

describe('wsReducer', () => {

  it('Возвращает начальное состояние', () => {
    expect(wsReducer(initialState, {})).toEqual({
      wsConnected: false,
      allOrders: [{
        success: false,
        orders: [{
          ingredients: [],
          _id: '',
          status: '',
          number: '',
          name: '',
          createdAt: '',
          updateAt: '',
        }
        ],
        total: '',
        totalToday: '',
      }],
      userOrders: [{
        success: false,
        orders: [{
          ingredients: [],
          _id: '',
          status: '',
          number: '',
          name: '',
          createdAt: '',
          updateAt: '',
        }
        ],
        total: '',
        totalToday: '',
      }],
      url: null
    })
  })

  it('Должно обрабатывать WS_CONNECTION_SUCCESS', () => {

    const earlierState = {
      ...initialState,
      wsConnected: false
    }
    const action = {
      type: type.WS_CONNECTION_SUCCESS,

    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      wsConnected: true
    })

  })

  it('Должно обрабатывать WS_CONNECTION_ERROR', () => {

    const earlierState = {
      ...initialState,
      wsConnected: true
    }

    const action = {
      type: type.WS_CONNECTION_ERROR,
      error: {}
    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: action.error,
      wsConnected: false
    })

  })

  it('Должно обрабатывать WS_CONNECTION_CLOSED', () => {

    const earlierState = {
      ...initialState,
      wsConnected: true
    }

    const action = {
      type: type.WS_CONNECTION_CLOSED,

    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      wsConnected: false
    })

  })

  it('Должно обрабатывать WS_GET_MESSAGE', () => {

    const earlierState = {
      ...initialState,
      wsConnected: true
    }

    const action = {
      type: type.WS_GET_MESSAGE,
      payload: []
    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      allOrders: [action.payload]
    })

  })

  it('Должно обрабатывать WS_USER_CONNECTION_SUCCESS', () => {

    const earlierState = {
      ...initialState,
      wsConnected: false
    }

    const action = {
      type: type.WS_USER_CONNECTION_SUCCESS,

    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      wsConnected: true
    })

  })

  it('Должно обрабатывать WS_USER_CONNECTION_CLOSED', () => {

    const earlierState = {
      ...initialState,
      wsConnected: true
    }

    const action = {
      type: type.WS_USER_CONNECTION_CLOSED,

    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      wsConnected: false
    })

  })

  it('Должно обрабатывать WS_USER_CONNECTION_ERROR', () => {

    const earlierState = {
      ...initialState,
      wsConnected: false
    }

    const action = {
      type: type.WS_USER_CONNECTION_ERROR,
      error: {}
    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: action.error,
      wsConnected: false
    })

  })

  it('Должно обрабатывать WS_USER_GET_MESSAGE', () => {

    const earlierState = {
      ...initialState,
      wsConnected: true
    }

    const action = {
      type: type.WS_USER_GET_MESSAGE,
      payload: []
    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      userOrders: [action.payload]
    })

  })

  it('Должно обрабатывать WS_USER_CONNECTION_START', () => {

    const earlierState = {
      ...initialState,
      wsConnected: false
    }

    const action = {
      type: type.WS_USER_CONNECTION_START,
      url: 'http://somethingNotInteresting'
    }

    expect(wsReducer(earlierState, action)).toEqual({
      ...earlierState,
      error: undefined,
      url: action.payload
    })

  })

})