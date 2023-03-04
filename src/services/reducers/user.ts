import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_EXIT,
  LOGIN_EXIT_REQUEST,
  LOGIN_EXIT_FAILED,
  LOGIN_GET_DATA,
  LOGIN_GET_DATA_REQUEST,
  LOGIN_GET_DATA_FAILED,
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_INFO,
  USER_UPDATE_INFO_FAILED,
  TUserActions
} from "../actions/user";
import { IUser } from "../actions/register";

interface IInitialState {
  loginRequest: boolean;
  loginFailed: boolean;
  userAuthorizied: boolean | IUser | null;
  logoutRequest: boolean;
  logoutFailed: boolean;
  dataRequest: boolean;
  user: null | IUser;
  updateDataRequest: boolean;
  updateDataFailed: boolean;
  dataFailed: boolean;
}

const initialState: IInitialState = {
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
  

}

export const loginUserReducer = (state = initialState, action: TUserActions): IInitialState => {

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
        userAuthorizied: action.userAuthorizied,

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

    case USER_UPDATE_INFO_REQUEST: {
      return {
        ...state,
        updateDataRequest: true
        
      }
    }

    case USER_UPDATE_INFO: {
      return {
        ...state,
        updateDataRequest: false,
        updateDataFailed: false,
        user: action.user,
        

      }
    }

    case USER_UPDATE_INFO_FAILED: {
      return {
        ...state,
        updateDataRequest: false,
        updateDataFailed: true
        
      }
    }

    default: {
      return state
    }
  }
}