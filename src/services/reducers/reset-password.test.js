import { resetPasswordReducer, initialState } from "./reset-password";
import * as type from '../actions/reset-password';

describe('resetPasswordReducer', () => {

  it('Должно возвращать начальное состояние', () => {

    expect(resetPasswordReducer(initialState, {})).toEqual({
      resetRequest: false,
      resetFailed: false,
      resetSuccess: false,
    })
  })

  it('Должно обрабатывать RESET_REQUEST', () => {

    const action = {
      type: type.RESET_REQUEST
    }

    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      resetRequest: true,
    })
  })

  it('Должно обрабатывать RESET_SUCCESS', () => {

    const earlierState = {
      ...initialState,
      resetRequest: true,
    }

    const action = {
      type: type.RESET_SUCCESS,
      reset: true
    }

    expect(resetPasswordReducer(earlierState, action)).toEqual({
      ...earlierState,
      resetRequest: false,
      resetSuccess: action.reset
    })
  })

  it('Должно обрабатывать RESET_FAILED', () => {

    const earlierState = {
      ...initialState,
      resetRequest: true,
    }

    const action = {
      type: type.RESET_FAILED,
    }

    expect(resetPasswordReducer(earlierState, action)).toEqual({
      ...earlierState,
      resetFailed: true,
      resetRequest: false,
      resetSuccess: false

    })
  })
})