import { IIngredientType } from "../types/types";

export const ALL_INGREDIENTS_REQUEST: 'ALL_INGREDIENTS_REQUEST' = 'ALL_INGREDIENTS_REQUEST';
export const ALL_INGREDIENTS_SUCCESS: 'ALL_INGREDIENTS_SUCCESS' = 'ALL_INGREDIENTS_SUCCESS';
export const ALL_INGREDIENTS_FAILED: 'ALL_INGREDIENTS_FAILED' = 'ALL_INGREDIENTS_FAILED';

export interface IAllIngredientsRequestAction {
  readonly type: typeof ALL_INGREDIENTS_REQUEST;
}

export interface IAllIngredientsSuccessAction {
  readonly type: typeof ALL_INGREDIENTS_SUCCESS;
  readonly products: IIngredientType[] | unknown;
}

export interface IAllIngredientsFailedAction {
  readonly type: typeof ALL_INGREDIENTS_FAILED;
}

export type TAllIngredientsActions =
  | IAllIngredientsRequestAction |
  IAllIngredientsSuccessAction |
  IAllIngredientsFailedAction;