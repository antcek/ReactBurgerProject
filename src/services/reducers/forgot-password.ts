import { RECOVER_FAILED, RECOVER_SUCCESS, RECOVER_REQUEST, TRecoverActions } from "../actions/forgot-password";

interface IinitialState {
    recoverRequest: boolean;
    recoverFailed: boolean;
    recoverSuccess: boolean
  }

const initialState: IinitialState = {
  recoverRequest: false,
  recoverFailed: false,
  recoverSuccess: false,
}

export const recoverPasswordReducer = (state = initialState, action: TRecoverActions): IinitialState => {

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
                recoverSuccess: action.success
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