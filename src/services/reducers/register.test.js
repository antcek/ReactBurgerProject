import { registerUserReducer, initialState } from "./register";
import * as type from '../actions/register';

describe('registerUserReducer', () => {

  it('Должно возвращать начальное состояние', () => {
    expect(registerUserReducer(initialState, {})).toEqual({
      registerRequest: false,
      registerFailed: false,
      registerNewUser: false,
    })
  })

  it('Должно обрабатывать REGISTER_REQUEST', () => {

    const action = {
      type: type.REGISTER_REQUEST
    }

    expect(registerUserReducer(initialState, action)).toEqual({
      ...initialState,
      registerRequest: true,

    })
  })

  it('Должно обрабатывать REGISTER_SUCCESS', () => {

    const earlierState = {
      ...initialState,
      registerRequest: true,
    }

    const action = {
      type: type.REGISTER_SUCCESS,
      user: {},
    }

    expect(registerUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      registerRequest: false,
      registerNewUser: action.user,

    })
  })

  it('Должно обрабатывать REGISTER_FAILED', () => {

    const earlierState = {
      ...initialState,
      registerRequest: true,
    }

    const action = {
      type: type.REGISTER_FAILED,

    }

    expect(registerUserReducer(earlierState, action)).toEqual({
      ...earlierState,
      registerFailed: true,
      registerRequest: false,
      registerNewUser: false,

    })
  })
})