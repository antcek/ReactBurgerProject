export const RECOVER_REQUEST: 'RECOVER_REQUEST' = 'RECOVER_REQUEST';
export const RECOVER_SUCCESS: 'RECOVER_SUCCESS' = 'RECOVER_SUCCESS';
export const RECOVER_FAILED: 'RECOVER_FAILED' = 'RECOVER_FAILED';


export interface IRecoverRequestAction {
  readonly type: typeof RECOVER_REQUEST;
}

export interface IRecoverSuccessAction {
  readonly type: typeof RECOVER_SUCCESS;
  readonly success: boolean;
}

export interface IRecoverFailedAction {
  readonly type: typeof RECOVER_FAILED;
}

export type TRecoverActions = | IRecoverRequestAction | IRecoverSuccessAction | IRecoverFailedAction;