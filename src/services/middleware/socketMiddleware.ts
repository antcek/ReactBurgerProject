import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from '../types/redux-index';
import Cookies from 'js-cookie'
import { TWSActionType } from "../types/types";



export const socketMiddleware = (wsUrl: string, wsActions: TWSActionType | any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;
      const { user } = getState().loginUser;


      if (type === wsInit) {

        socket = new WebSocket(wsUrl);
      }

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

        socket.onmessage = (event) => {

          const { data } = event;
          const parsedData = JSON.parse(data);
    
          if (type === wsSendMessage && parsedData.message === 'Invalid or missing token') {

            const sendData = {...payload, token: localStorage.getItem('refreshToken') };
             socket?.send(JSON.stringify(sendData));
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