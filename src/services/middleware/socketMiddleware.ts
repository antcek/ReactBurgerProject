import type { Middleware, MiddlewareAPI } from "redux";
import type { TApplicationActions, AppDispatch, RootState } from '../types/redux-index';
import type { TWSActions } from "../actions/web-socket";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch, getState } = store;
      const { type } = action;

      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {

        socket.onopen = (event) => {
          dispatch({
            type: 'WS_CONNECTION_SUCCESS',
            payload: event
          });
        };

        socket.onmessage = (event) => {

          const { data } = event;
          
          dispatch({
            type: 'WS_GET_MESSAGE',
            payload: JSON.parse(data)
          });

        };

        socket.onclose = event => {
          dispatch({
            type: 'WS_CONNECTION_CLOSED',
            payload: event
          });
        };


      }

      next(action);
    };
  }) as Middleware
};