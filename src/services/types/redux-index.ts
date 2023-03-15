import { store } from '../../index';
import { TAllIngredientsActions } from '../actions/app';
import { TConstructorActions } from '../actions/burger-constructor';
import { TAllDetailsActions } from '../actions/ingredient-details';
import { TRecoverActions } from '../actions/forgot-password';
import { TOrderActions } from '../actions/order-details';
import { TRegisterActions } from '../actions/register';
import { TResetActions } from '../actions/reset-password';
import { TUserActions } from '../actions/user';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TWSActions } from '../actions/web-socket';
import { TWSActionType } from './types';


export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TAllIngredientsActions |
  TConstructorActions |
  TAllDetailsActions |
  TRecoverActions |
  TOrderActions |
  TRegisterActions |
  TResetActions |
  TUserActions |
  TWSActions ;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;





