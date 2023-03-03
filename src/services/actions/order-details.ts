export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_FAILED: 'ORDER_FAILED' = 'ORDER_FAILED';

export interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IOrderFailedAction {
  readonly type: typeof ORDER_FAILED;
}

export type TOrderActions = IOrderRequestAction | IOrderSuccessAction | IOrderFailedAction;