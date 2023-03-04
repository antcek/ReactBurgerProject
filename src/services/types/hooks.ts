import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import { AnyAction,Dispatch } from 'redux';
import { RootState, AppDispatch, AppThunk } from './redux-index'

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<Dispatch>();