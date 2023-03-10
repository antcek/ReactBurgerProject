import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST } from "../actions/order-details";

const initialState = {
    orderRequest: false,
    orderFailed: false,
    orderNumber: ''

}

export const orderNumberReducer = (state = initialState, action) => {

    switch (action.type) {

        case ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed:false,
            }
        }

        case ORDER_SUCCESS: {

            return {
                ...state,
                orderRequest: false,
                orderNumber: action.orderNumber,
                orderFailed:false,
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