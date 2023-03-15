import { useLocation } from "react-router";
import { useEffect, useState } from 'react';
import { CURRENT_INGREDIENT_DETAILS } from "../actions/ingredient-details";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { IIngredientType, IOrderData, IUseLocation } from "../types/types";


export type TValues = {
    name: string;
    email: string;
    password: string;
}

export type TFormValues = {
    values: TValues;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValues: (values: TValues) => void;
}

export const useModalData = (): void => {

    const dispatch = useDispatch();
    const location: IUseLocation = useLocation();
    const locationUrlIndex = location.pathname.indexOf('/ingredients/');
    const locationIngredientId = location.pathname.substring(locationUrlIndex + '/ingredients/'.length)

    const storageToken = localStorage.getItem('modalData');
    const modalIngredient = typeof storageToken === 'string' ? JSON.parse(storageToken) : null;

    useEffect(() => {
        if (locationIngredientId === modalIngredient?._id) {
            dispatch({
                type: CURRENT_INGREDIENT_DETAILS,
                product: modalIngredient,
                visible: true,
            })
        }
        // ругается на modalIngredients, который в зависимостях даёт бесконечный рендер
    }, [locationIngredientId, dispatch]) // eslint-disable-line
}

export function useForm(nameValue: TValues): TFormValues {
    const [values, setValues] = useState(nameValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}

export const useOrderFullPrice = (targetOrder: IOrderData | undefined | null): number | undefined => {

    const allIngredients = useSelector(store => store.getProducts.products);
    const orderAllData = targetOrder?.ingredients?.map(orderItem => {

        return allIngredients?.find(ingredient => (ingredient._id === orderItem))
    });
    const orderWithCount = orderAllData && Object.values(
        orderAllData.reduce((acc: any, obj: any) => {
            const { name } = obj;
            if (!acc[name]) {
                acc[name] = { name, count: 0, ...obj };
            }
            acc[name].count++;
            return acc;
        }, {})
    );

    return (orderWithCount as IIngredientType[])?.reduce((accumulator, item: IIngredientType): number => {
      
        return accumulator + (item?.type === 'bun' ? item!.price * 2 : item!.price * (item.count as number))
    }, 0);

}