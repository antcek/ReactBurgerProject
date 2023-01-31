import { LOGIN_FAILED, 
  LOGIN_SUCCESS,
   LOGIN_REQUEST,
   LOGIN_EXIT, 
   LOGIN_EXIT_REQUEST,
  LOGIN_EXIT_FAILED } from "../actions/login";

const initialState = {
  loginRequest: false,
  loginFailed: false,
  user: JSON.parse(localStorage.getItem('user')),
  logoutRequest: false,
  logoutFailed: false,
  
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
        user: action.user,
       
      }
    }


    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
       
      }
    }
    
    case LOGIN_EXIT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        
      }
    }
    case LOGIN_EXIT: {
      return {
        ...state,
        user: action.user,
        logoutRequest: false,
      }
    }

    case LOGIN_EXIT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,

      }
    }

    default: {
      return state
    }
  }
}