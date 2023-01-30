import { RESET_FAILED, RESET_SUCCESS, RESET_REQUEST } from "../actions/reset-password";

const initialState = {
  resetRequest: false,
  resetFailed: false,
  
}

export const resetPasswordReducer = (state = initialState, action) => {

    switch (action.type) {

        case RESET_REQUEST: {
            return {
             ...state,
             resetRequest: true,
            }
        }

        case RESET_SUCCESS: {

            return {
                ...state,
                resetRequest: false,
           
            }
        }


        case RESET_FAILED: {
            return {
                ...state,
                resetFailed: true,
                resetRequest: false,
            }
        }

        default: {
            return state
        }
    }
}