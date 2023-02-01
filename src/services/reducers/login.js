import { LOGIN_FAILED, 
  LOGIN_SUCCESS,
   LOGIN_REQUEST,
   LOGIN_EXIT, 
   LOGIN_EXIT_REQUEST,
  LOGIN_EXIT_FAILED, 
  LOGIN_GET_DATA,
  LOGIN_GET_DATA_REQUEST,
  LOGIN_GET_DATA_FAILED} from "../actions/login";

const initialState = {
  loginRequest: false,
  loginFailed: false,
  userAuthorizied: false,
  logoutRequest: false,
  logoutFailed: false,
  user: null
  
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
        userAuthorizied: action.user,
       
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
        userAuthorizied: action.user,
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
    
    case LOGIN_GET_DATA_REQUEST: {
      return {
        ...state,
        dataRequest: true
      }
    }
     
    case LOGIN_GET_DATA: {
      return {
        ...state,
        dataRequest: false,
        user: action.user,
        userAuthorizied: action.userAuthorizied
      }
    }

    case LOGIN_GET_DATA_FAILED: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: true
      }
    }

    default: {
      return state
    }
  }
}