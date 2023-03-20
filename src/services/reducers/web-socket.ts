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
  IMessage,
  WS_USER_CONNECTION_START
} from "../actions/web-socket";


interface TWSState {

  wsConnected: boolean;
  allOrders: IMessage[];
  error?: Event;
  userOrders: IMessage[];
  url?: string | null;
}

const initialState: TWSState = {
  wsConnected: false,
  allOrders: [{
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
  url: null
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
        allOrders: [action.payload]
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

    case WS_USER_CONNECTION_START: {
       return {
        ...state,
        error: undefined,
        url: action.payload
       }
    } 

    default:
      return state;


  }
}