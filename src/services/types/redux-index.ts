import { store } from '../../index';
import { TAllIngredientsActions } from '../actions/app';
import { TConstructorActions } from '../actions/burger-constructor';
import { TCurrentIngredientDetailsActions } from '../actions/ingredient-details';
import { TRecoverActions } from '../actions/forgot-password';
import { TOrderActions } from '../actions/order-details';
import { TRegisterActions } from '../actions/register';
import { TResetActions } from '../actions/reset-password';
import { TUserActions } from '../actions/user';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';


export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TAllIngredientsActions |
  TConstructorActions |
  TCurrentIngredientDetailsActions |
  TRecoverActions |
  TOrderActions |
  TRegisterActions |
  TResetActions |
  TUserActions;

export type AppDispatch = Dispatch<TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;





