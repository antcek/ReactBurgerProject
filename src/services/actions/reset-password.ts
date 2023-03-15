export const RESET_REQUEST: 'RESET_REQUEST' = 'RESET_REQUEST';
export const RESET_SUCCESS: 'RESET_SUCCESS' = 'RESET_SUCCESS';
export const RESET_FAILED: 'RESET_FAILED' = 'RESET_FAILED';

export interface IReset {
  success: boolean;
  message: string;
}

export interface IResetRequestAction {
  readonly type: typeof RESET_REQUEST;
}

export interface IResetSuccessAction {
  readonly type: typeof RESET_SUCCESS;
  readonly reset: IReset | boolean;
}

export interface IResetFailedAction {
  readonly type: typeof RESET_FAILED;
}

export type TResetActions = | IResetRequestAction | IResetSuccessAction | IResetFailedAction;