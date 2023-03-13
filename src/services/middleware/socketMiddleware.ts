import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from '../types/redux-index';
import Cookies from 'js-cookie'
import { TWSActionType } from "../types/types";
import { updateToken } from "../thunk-actions/thunk-actions";



export const socketMiddleware = (wsUrl: string, wsActions: TWSActionType | any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().loginUser;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      };

      if (type === wsInit && user) {

        socket = new WebSocket(`${payload?.href || wsUrl}`)
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

            updateToken()   //вызываем обновление токена
              .then((refreshData) => {
                const wssUrl = new URL(wsUrl);
                wssUrl.searchParams.set(
                  'token',
                  refreshData.accessToken
                );

                dispatch({    //диспатчи экшен нового подключения
                  type: wsInit,
                  payload: wssUrl,
                });
              })
              .catch((err: any) => {
                dispatch({ type: onError, payload: err });
              });


            dispatch({ type: onClose });  //закрываем предыдущее подключение

            return;

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
}