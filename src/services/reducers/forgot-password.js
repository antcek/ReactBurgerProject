import { RECOVER_FAILED, RECOVER_SUCCESS, RECOVER_REQUEST } from "../actions/forgot-password";

const initialState = {
  recoverRequest: false,
  recoverFailed: false,
  
}

export const recoverPasswordReducer = (state = initialState, action) => {

    switch (action.type) {

        case RECOVER_REQUEST: {
            return {
             ...state,
              recoverRequest: true,
            }
        }

        case RECOVER_SUCCESS: {

            return {
                ...state,
                recoverRequest: false,
           
            }
        }


        case RECOVER_FAILED: {
            return {
                ...state,
                recoverFailed: true,
                recoverRequest: false,
            }
        }

        default: {
            return state
        }
    }
}