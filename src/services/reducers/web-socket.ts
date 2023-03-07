import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  TWSActions,
  IMessage
} from "../actions/web-socket";


interface TWSState {

  wsConnected: boolean;
  messages: IMessage[];
  error?: Event;
  userOrders: IMessage[];
}

const initialState: TWSState = {
  wsConnected: false,
  messages: [{
    success: false,
    orders: [{
      ingredients: [],
      _id: '',
      status: '',
      number: '',
      name: '',
      createdAt: '',
      updateAt: '',
    }
    ],
    total: '',
    totalToday: '',
  }],
  userOrders: [{
    success: false,
    orders: [{
      ingredients: [],
      _id: '',
      status: '',
      number: '',
      name: '',
      createdAt: '',
      updateAt: '',
    }
    ],
    total: '',
    totalToday: '',
  }],
}

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {

  switch (action.type) {

    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }

    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.error,
        wsConnected: false
      };
    }

    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    }

    case WS_GET_MESSAGE: {

      return {
        ...state,
        error: undefined,
        messages: [action.payload]
      };
    }

    case WS_USER_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }

    case WS_USER_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    }

    case WS_USER_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.error,
        wsConnected: false
      };
    }

    case WS_USER_GET_MESSAGE: {
      return {
        ...state,
        error: undefined,
        userOrders: [action.payload]
      };
    }

    default:
      return state;


  }
}