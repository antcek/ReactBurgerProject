import { RESET_FAILED, RESET_SUCCESS, RESET_REQUEST, TResetActions, IReset } from "../actions/reset-password";

interface IInitialState {
    resetRequest: boolean;
    resetFailed: boolean;
    resetSuccess: boolean | IReset;
}

export const initialState: IInitialState = {
    resetRequest: false,
    resetFailed: false,
    resetSuccess: false,
}

export const resetPasswordReducer = (state = initialState, action: TResetActions): IInitialState => {

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
                resetSuccess: action.reset
            }
        }

        case RESET_FAILED: {
            return {
                ...state,
                resetFailed: true,
                resetRequest: false,
                resetSuccess: false
            }
        }

        default: {
            return state
        }
    }
}