import { IIngredientType, IOrderData } from "../types/types";

export const CURRENT_INGREDIENT_DETAILS: 'CURRENT_INGREDIENT_DETAILS' = 'CURRENT_INGREDIENT_DETAILS';
export const CURRENT_INGREDIENTS_DETAILS_MODAL: 'CURRENT_INGREDIENTS_DETAILS_MODAL' = 'CURRENT_INGREDIENTS_DETAILS_MODAL';
export const FEED_MODAl_DETAILS: 'FEED_MODAl_DETAILS' = 'FEED_MODAl_DETAILS';
export const PERSONAL_MODAL_DETAILS: 'PERSONAL_MODAL_DETAILS' = 'PERSONAL_MODAL_DETAILS';

export interface ICurrentIngDetailsAction {
  readonly type: typeof CURRENT_INGREDIENT_DETAILS;
  readonly visible: boolean;
  readonly product: IIngredientType;
}

export interface ICurrentIngsDetailsModalAction {
  readonly type: typeof CURRENT_INGREDIENTS_DETAILS_MODAL;
  readonly visible: boolean;
}

export interface IFeedModalDetails {
  readonly type: typeof FEED_MODAl_DETAILS;
  visible: boolean;
  targetOrder: IOrderData;
}

export interface IPersonalModalDetails {
  readonly type: typeof PERSONAL_MODAL_DETAILS;
  visible: boolean;

}

export type TAllDetailsActions = | ICurrentIngDetailsAction 
| ICurrentIngsDetailsModalAction | IFeedModalDetails | IPersonalModalDetails;