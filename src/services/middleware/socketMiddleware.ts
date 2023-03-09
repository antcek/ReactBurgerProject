import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from '../types/redux-index';
import Cookies from 'js-cookie'
import { TWSActionType } from "../types/types";
import { updateToken } from "../thunk-actions/thunk-actions";
import { WS_SEND_MESSAGE, WS_USER_CONNECTION_SUCCESS } from "../actions/web-socket";



export const socketMiddleware = (wsUrl: string, wsActions: TWSActionType | any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;
      const { user } = getState().loginUser;
      let accessToken = Cookies.get('accessToken');


      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      };

      if (type === wsInit && user) {

        socket = new WebSocket(`${wsUrl}?token=${Cookies.get('accessToken')}`)
      }


      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: event
          });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData?.message === 'Invalid or missing token') {
            // updateToken();
        
          }

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