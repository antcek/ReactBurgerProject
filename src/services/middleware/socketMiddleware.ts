import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState, TApplicationActions } from '../types/redux-index';
import { TWSActions, WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS } from "../actions/web-socket";
import Cookies from 'js-cookie'
import { TWSActionType } from "../types/types";


export const socketMiddleware = (wsUrl: string, wsActions: TWSActionType | any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {

        socket = new WebSocket(wsUrl);
      }

      if (type === wsInit && Cookies.get('accessToken')) {

        socket = new WebSocket(`${wsUrl}?token=${Cookies.get('accessToken')}`)
      }

      if (socket) {

        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: event
          });
        };

        socket.onmessage = (event) => {

          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({
            type: onMessage,
            payload: parsedData
          });

        };

        socket.onerror = (event) => {
          dispatch({
            type: onError,
            payload: event
          })
        }

        socket.onclose = event => {
          dispatch({
            type: onClose,
            payload: event
          });
        };


      }

      next(action);
    };
  }) as Middleware
};