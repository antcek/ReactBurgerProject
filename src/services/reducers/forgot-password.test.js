import { recoverPasswordReducer, initialState } from "./forgot-password";
import * as type from '../actions/forgot-password';


describe('recoverPasswordReducer', () => {

  it('должно вернуть начальное состояние', () => {

    expect(recoverPasswordReducer(initialState, {})).toEqual({
      recoverRequest: false,
      recoverFailed: false,
      recoverSuccess: false,
    })
  })

  it('Должно обрабатывать RECOVER_REQUEST', () => {

    const action = {
      type: type.RECOVER_REQUEST,
    }

    expect(recoverPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      recoverRequest: true,
    })

  })

  it('Должно обрабатывать RECOVER_SUCCESS', () => {

    const earlierState = {
      ...initialState,
      recoverRequest: true,
    }

    const action = {
      type: type.RECOVER_SUCCESS,
      success: true
    }

    expect(recoverPasswordReducer(earlierState, action)).toEqual({
      ...earlierState,
      recoverRequest: false,
      recoverSuccess: action.success
    })

  })

  it('Должно обрабатывать RECOVER_FAILED', () => {

    const earlierState = {
      ...initialState,
      recoverRequest: true,
    }

    const action = {
      type: type.RECOVER_FAILED,

    };

    expect(recoverPasswordReducer(earlierState, action)).toEqual({
      ...earlierState,
      recoverFailed: true,
      recoverRequest: false,
    })

  })
})