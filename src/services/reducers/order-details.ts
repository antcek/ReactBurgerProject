import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST, TOrderActions } from "../actions/order-details";

interface IInitialState {
    orderRequest: boolean;
    orderFailed: boolean;
    orderNumber: null | number;
}

const initialState: IInitialState = {
    orderRequest: false,
    orderFailed: false,
    orderNumber: null,

}

export const orderNumberReducer = (state = initialState, action: TOrderActions): IInitialState => {

    switch (action.type) {

        case ORDER_REQUEST: {

            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        }

        case ORDER_SUCCESS: {

            return {
                ...state,
                orderRequest: false,
                orderNumber: action.orderNumber,
                orderFailed: false,
            }
        }


        case ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }

        default: {
            return state
        }
    }
}