import { IIngredientType } from "../types/types";

export const CURRENT_INGREDIENT_DETAILS: 'CURRENT_INGREDIENT_DETAILS' = 'CURRENT_INGREDIENT_DETAILS';
export const CURRENT_INGREDIENTS_DETAILS_MODAL: 'CURRENT_INGREDIENTS_DETAILS_MODAL' = 'CURRENT_INGREDIENTS_DETAILS_MODAL';

export interface ICurrentIngDetailsAction {
  readonly type: typeof CURRENT_INGREDIENT_DETAILS;
  readonly visible: boolean;
  readonly product: IIngredientType;
}

export interface ICurrentIngsDetailsModalAction {
  readonly type: typeof CURRENT_INGREDIENTS_DETAILS_MODAL;
  readonly visible: boolean;
}

export type TCurrentIngredientDetailsActions = ICurrentIngDetailsAction | ICurrentIngsDetailsModalAction