import { useLocation } from "react-router";
import {useEffect} from 'react';
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

    }, [locationIngredientId])
}