import { IIngredientType } from "../types/types";

export const SET_CONSTRUCTOR_INGREDIENT: 'SET_CONSTRUCTOR_INGREDIENT' = 'SET_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT: 'DELETE_CONSTRUCTOR_INGREDIENT' = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const SET_CONSTRUCTOR_BUN: 'SET_CONSTRUCTOR_BUN' = 'SET_CONSTRUCTOR_BUN';
export const SORT_CONSTRUCTOR_INGREDIENT: 'SORT_CONSTRUCTOR_INGREDIENT' = 'SORT_CONSTRUCTOR_INGREDIENT';

type ConstructorIngredients = {
  [product: string]: IIngredientType
}

export interface ISetIngredientAction {
  readonly type: typeof SET_CONSTRUCTOR_INGREDIENT;
  readonly ingredients: ConstructorIngredients;
  readonly key: number;
  

}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  readonly id: number;
}

export interface ISetBun {
  readonly type: typeof SET_CONSTRUCTOR_BUN;
  readonly buns: ConstructorIngredients;
}

export interface ISortIngredientAction {
  readonly type: typeof SORT_CONSTRUCTOR_INGREDIENT;
  readonly ingredients: IIngredientType[]; 
}

export type TConstructorActions =
  ISetIngredientAction | 
  IDeleteIngredientAction |
  ISetBun | 
  ISortIngredientAction;