import { IUser } from "./register";

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGIN_EXIT: 'LOGIN_EXIT' = 'LOGIN_EXIT';
export const LOGIN_EXIT_REQUEST: 'LOGIN_EXIT_REQUEST' = 'LOGIN_EXIT_REQUEST';
export const LOGIN_EXIT_FAILED: 'LOGIN_EXIT_FAILED' = 'LOGIN_EXIT_FAILED';
export const LOGIN_GET_DATA: 'LOGIN_GET_DATA' = 'LOGIN_GET_DATA';
export const LOGIN_GET_DATA_REQUEST: 'LOGIN_GET_DATA_REQUEST' = 'LOGIN_GET_DATA_REQUEST';
export const LOGIN_GET_DATA_FAILED: 'LOGIN_GET_DATA_FAILED' = 'LOGIN_GET_DATA_FAILED';
export const USER_UPDATE_INFO: 'USER_UPDATE_INFO' = 'USER_UPDATE_INFO';
export const USER_UPDATE_INFO_REQUEST: 'USER_UPDATE_INFO_REQUEST' = 'USER_UPDATE_INFO_REQUEST';
export const USER_UPDATE_INFO_FAILED: 'USER_UPDATE_INFO_FAILED' = 'USER_UPDATE_INFO_FAILED';

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly userAuthorizied: boolean;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILoginExitRequestAction {
  readonly type: typeof LOGIN_EXIT_REQUEST;
}

export interface ILoginExitAction {
  readonly type: typeof LOGIN_EXIT;
  readonly user: null
}

export interface ILoginExitFailedAction {
  readonly type: typeof LOGIN_EXIT_FAILED;
}

export interface ILoginDataRequestAction {
  readonly type: typeof LOGIN_GET_DATA_REQUEST;
}

export interface ILoginDataAction {
  readonly type: typeof LOGIN_GET_DATA;
  readonly userAuthorizied: boolean;
  readonly user: IUser ;
}

export interface ILoginDataFailedAction {
  readonly type: typeof LOGIN_GET_DATA_FAILED;
}

export interface IUserUpdateRequestAction {
  readonly type: typeof USER_UPDATE_INFO_REQUEST;
}

export interface IUserUpdateAction {
  readonly type: typeof USER_UPDATE_INFO;
  readonly user: IUser
}

export interface IUserUpdateFailedAction {
  readonly type: typeof USER_UPDATE_INFO_FAILED;
}

export type TUserActions =
  | ILoginRequestAction |
  ILoginSuccessAction |
  ILoginFailedAction |
  ILoginExitRequestAction |
  ILoginExitAction |
  ILoginExitFailedAction |
  ILoginDataRequestAction |
  ILoginDataAction |
  ILoginDataFailedAction |
  IUserUpdateRequestAction |
  IUserUpdateAction |
  IUserUpdateFailedAction;







