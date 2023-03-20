import { REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_REQUEST,TRegisterActions, IUser } from "../actions/register";

interface IInitialState {
  registerRequest: boolean;
  registerFailed: boolean;
  registerNewUser: boolean | IUser ;
}

export const initialState: IInitialState = {
  registerRequest: false,
  registerFailed: false,
  registerNewUser: false,

}

export const registerUserReducer = (state = initialState, action: TRegisterActions): IInitialState => {

  switch (action.type) {

    case REGISTER_REQUEST: {
      return {
        ...state, 
        registerRequest: true,
       
      }
    }

    case REGISTER_SUCCESS: {
        
      return {
        ...state,
        registerRequest: false,
        registerNewUser: action.user,

      }
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
        registerNewUser: false,
      }
    }

    default: {
      return state
    }
  }
}