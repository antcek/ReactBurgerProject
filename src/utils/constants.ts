import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_SUCCESS,
  WS_SEND_MESSAGE
} from "../services/actions/web-socket";


export const validateEmail = (email: string): boolean => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export const URLHost = 'http://localhost:3000';

export const SCROLL_DURATION = 400;

export const wsAllActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE
}

export const wsUserActions  = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
  wsSendMessage:WS_SEND_MESSAGE

}
