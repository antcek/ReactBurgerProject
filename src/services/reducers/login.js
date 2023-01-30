import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_REQUEST,LOGIN_EXIT } from "../actions/login";

const initialState = {
  loginRequest: false,
  loginFailed: false,
  user: []

}

export const loginUserReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_REQUEST: {
      return {
        ...state, 
        loginRequest: true
      }
    }

    case LOGIN_SUCCESS: {

      return {
        ...state,
        loginRequest: false,
        user: [action.user]

      }
    }


    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false
      }
    }

    case LOGIN_EXIT: {
      return {
        ...state,
        user: action.user
      }
    }

    default: {
      return state
    }
  }
}