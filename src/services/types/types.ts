
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

export interface IIngredients {
  success: boolean;
  data?: Array<IIngredientType>;
}

export interface IOrderData {
  ingredients: string[];
  _id: string;
  status: string;
  number: number | '';
  name:string;
  createdAt: string;
  updateAt: string;
}

export type TWSActionType = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSendMessage: string;
}










