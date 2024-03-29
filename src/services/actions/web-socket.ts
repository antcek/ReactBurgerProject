export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_GET_MESSAGE: 'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_CONNECTION_ERROR: 'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';


export interface IMessage {
  success: boolean;
  orders: [{
    ingredients: string[];
    _id: string | '';
    status: string | '';
    number: number | '';
    name: string | '';
    createdAt: string | '';
    updateAt: string | '';
  }
  ];
  total: number | '';
  totalToday: number | '';

}

export interface IWSSendMessage {
  readonly type: typeof WS_SEND_MESSAGE
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
export interface IUserWSStart {
  readonly type: typeof WS_USER_CONNECTION_START;
  payload: string | null;
}

export interface IUserWSSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}

export interface IUserWSGetMessage {
  readonly type: typeof WS_USER_GET_MESSAGE;
  payload: IMessage;
}

export interface IUserWSClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}

export interface IUserWSError {
  readonly type: typeof WS_USER_CONNECTION_ERROR,
  error: Event;
}

export type TWSActions = | IWSSendMessage
  | IWSStart |
  IWSSuccess |
  IWSGetMessage |
  IWSClosed |
  IWSError |
  IUserWSStart |
  IUserWSSuccess |
  IUserWSGetMessage |
  IUserWSClosed |
  IUserWSError;

