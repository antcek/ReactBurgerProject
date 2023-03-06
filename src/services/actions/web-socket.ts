export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';


export interface IMessage {
  success: boolean;
  orders: [{
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    name:string;
    createdAt: string;
    updateAt: string;
  }
  ];
  total: number;
  totalToday: number;
}

export interface IWSStart {

  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSSuccess {

  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSGetMessage {

  readonly type: typeof WS_GET_MESSAGE;
  payload: IMessage
}


export interface IWSClosed {

  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSError {

  readonly type: typeof WS_CONNECTION_ERROR;
  error: Event;
}

export type TWSActions =
  | IWSStart |
  IWSSuccess |
  IWSGetMessage |
  IWSClosed |
  IWSError;

