import { useLocation } from "react-router";
import { useEffect,useState } from 'react';
import { CURRENT_INGREDIENT_DETAILS } from "../actions/ingredient-details";
import { useDispatch } from "react-redux";

export const useModalData = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const modalIngredient = JSON.parse(localStorage.getItem('modalData'));
    const locationUrlIndex = location.pathname.indexOf('/ingredients/');
    const locationIngredientId = location.pathname.substring(locationUrlIndex + '/ingredients/'.length)

    useEffect(() => {
        if (locationIngredientId === modalIngredient?._id) {
            dispatch({
                type: CURRENT_INGREDIENT_DETAILS,
                product: modalIngredient,
                visible: true,
            })
        }
         // ругается на modalIngredients, который в зависимостях даёт бесконечный рендер
    }, [locationIngredientId,dispatch]) // eslint-disable-line
}

export function useForm(nameValue) {
    const [values, setValues] = useState(nameValue);
  
    const handleChange = event => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }