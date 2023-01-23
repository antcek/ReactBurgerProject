import {
  ALL_INGREDIENTS_SUCCESS,
  ALL_INGREDIENTS_REQUEST,
  ALL_INGREDIENTS_FAILED
} from "../actions/app";
import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST } from "../actions/order-details";
import { BURGER_API_URL, NORMA_API } from "../../utils/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}


export function getIngredients() {

  return async function (dispatch) {

      dispatch({
          type: ALL_INGREDIENTS_REQUEST
      });


      try {
          const response = await fetch(`${BURGER_API_URL}/ingredients`);

          checkResponse(response).then(ingredients => dispatch({
              type: ALL_INGREDIENTS_SUCCESS,
              products: ingredients.data
          }));

      } catch (err) {
          dispatch({
              type: ALL_INGREDIENTS_FAILED,
          });

      };
  }

};

export function sendOrder(idConstructor) {

  return async function (dispatch) {

      dispatch({
          type: ORDER_REQUEST
      });

      try {
          const response = await fetch(`${NORMA_API}/orders`,
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(idConstructor),
              });

          checkResponse(response).then(result => dispatch({
              type: ORDER_SUCCESS,
              orderNumber: result.order.number
          }))

      } catch (err) {

          dispatch({
              type: ORDER_FAILED
          })
      }
  }
}