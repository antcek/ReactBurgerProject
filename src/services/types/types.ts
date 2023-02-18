import { ReactNode } from "react";

export interface ITokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface IUseLocation {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}

export interface IIngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: number;
}

export type TTab = {
  onClick: (value:string) => void;
}

export type TBurgerAllId = {
  ingredients: Array<string>
}

export type TItemDrop = {
  index: number;
}

export interface IDraggedIngredientCardProps {

  onOpenModal: (event?: any) => void;
  ingredient: IIngredientType;
  index: number;
  moveIngredient: (arg1: number, arg2:number) => void;
}

export interface IIngredientCard {
  onOpenModal: (event?: any) => void;
  product: IIngredientType;
}

export interface IModal {
  onCloseModal: () => void;
  children?: ReactNode;
}





