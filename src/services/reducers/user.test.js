import { loginUserReducer, initialState } from "./user";
import * as type from '../actions/user';

describe('loginUserReducer', () => {

  it('Должно возвращать начальное состояние', () => {

    expect(loginUserReducer(initialState, {})).toEqual({
      loginRequest: false,
      loginFailed: false,
      userAuthorizied: false,
      logoutRequest: false,
      logoutFailed: false,
      dataRequest: false,
      user: null,
      updateDataRequest: false,
      updateDataFailed: false,
      dataFailed: false,
    })

  })

  it('Должно обрабатывать LOGIN_REQUEST', () => {
    const action = {
      type: type.LOGIN_REQUEST
    }

    expect(loginUserReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: true
    })

  })

  it('Должно обрабатывать LOGIN_SUCCESS', () => {

    const earlierState = {
      ...initialState,
      loginRequest: true
    }
    const action = {
      type: type.LOGIN_SUCCESS,
      userAuthorizied: true
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      loginRequest: false,
      userAuthorizied: action.userAuthorizied,
    })

  })

  it('Должно обрабатывать LOGIN_FAILED', () => {

    const earlierState = {
      ...initialState,
      loginRequest: true
    }
    const action = {
      type: type.LOGIN_FAILED,
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      loginFailed: true,
      loginRequest: false,
    })

  })

  it('Должно обрабатывать LOGIN_EXIT_REQUEST', () => {
    const action = {
      type: type.LOGIN_EXIT_REQUEST
    }

    expect(loginUserReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: true,
    })
  })

  it('Должно обрабатывать LOGIN_EXIT', () => {

    const earlierState = {
      ...initialState,
      logoutRequest: true,
    }
    const action = {
      type: type.LOGIN_EXIT,
      userAuthorizied: false
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      userAuthorizied: action.user,
      logoutRequest: false,
    })

  })

  it('Должно обрабатывать LOGIN_EXIT_FAILED', () => {

    const earlierState = {
      ...initialState,
      logoutRequest: true,
    }
    const action = {
      type: type.LOGIN_EXIT_FAILED,
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      logoutRequest: false,
      logoutFailed: true,
    })

  })

  it('Должно обрабатывать LOGIN_GET_DATA_REQUEST', () => {
    const action = {
      type: type.LOGIN_GET_DATA_REQUEST
    }

    expect(loginUserReducer(initialState, action)).toEqual({
      ...initialState,
      dataRequest: true
    })
  })

  it('Должно обрабатывать LOGIN_GET_DATA', () => {

    const earlierState = {
      ...initialState,
      dataRequest: true,
    }
    const action = {
      type: type.LOGIN_GET_DATA,
      userAuthorizied: false,
      user: {}
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      dataRequest: false,
      user: action.user,
      userAuthorizied: action.userAuthorizied
    })

  })

  it('Должно обрабатывать LOGIN_GET_DATA_FAILED', () => {

    const earlierState = {
      ...initialState,
      dataRequest: true,
    }

    const action = {
      type: type.LOGIN_GET_DATA_FAILED,
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      dataRequest: false,
      dataFailed: true
    })

  })

  it('Должно обрабатывать USER_UPDATE_INFO_REQUEST', () => {
    const action = {
      type: type.USER_UPDATE_INFO_REQUEST
    }

    expect(loginUserReducer(initialState, action)).toEqual({
      ...initialState,
      updateDataRequest: true
    })
  })

  it('Должно обрабатывать USER_UPDATE_INFO', () => {

    const earlierState = {
      ...initialState,
      updateDataRequest: true,
      user: { name: 'Vadim', email: 'vadimka444@mail.ru' }
    }
    const action = {
      type: type.USER_UPDATE_INFO,
      userAuthorizied: false,
      user: { name: 'ANDREY', email: 'andreykins888@mail.ru' }
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      updateDataRequest: false,
      updateDataFailed: false,
      user: action.user,
    })
  })

  it('Должно обрабатывать USER_UPDATE_INFO_FAILED', () => {

    const earlierState = {
      ...initialState,
      updateDataRequest: true,
    }

    const action = {
      type: type.USER_UPDATE_INFO_FAILED,
    }

    expect(loginUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      updateDataRequest: false,
      updateDataFailed: true
    })

  })
})