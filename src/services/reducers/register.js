import { REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_REQUEST } from "../actions/register";

const initialState = {
  registerRequest: false,
  registerFailed: false,
  users: []

}

export const registerUserReducer = (state = initialState, action) => {

  switch (action.type) {

    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      }
    }

    case REGISTER_SUCCESS: {

      return {
        ...state,
        registerRequest: false,
        users: [...state.users, action.user],

      }
    }


    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false
      }
    }

    default: {
      return state
    }
  }
}