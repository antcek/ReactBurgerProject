import {
    ALL_INGREDIENTS_SUCCESS,
    ALL_INGREDIENTS_REQUEST,
    ALL_INGREDIENTS_FAILED
} from "../actions/app";
import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST } from "../actions/order-details";
import {
    BURGER_API_URL,
    NORMA_API,
    API_PASSWORD_FORGOT,
    API_PASSWORD_RESET,
    API_REGISTER,
    API_LOGOUT,
    API_REFRESH_TOKEN,
    API_LOGIN,
} from "../../utils/api";
import { RECOVER_FAILED, RECOVER_SUCCESS, RECOVER_REQUEST } from "../actions/forgot-password";
import { RESET_FAILED, RESET_SUCCESS, RESET_REQUEST } from "../actions/reset-password";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/register";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/login";
import Cookies from 'js-cookie';


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

export function recoverPassword(loginValue) {

    return async function (dispatch) {

        dispatch({
            type: RECOVER_REQUEST,
        });

        try {

            const response = await fetch(`${API_PASSWORD_FORGOT}/password-reset`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': loginValue
                    }),

                });

            checkResponse(response).then(result =>

                dispatch({
                    type: RECOVER_SUCCESS,

                }))


        } catch (err) {

            dispatch({
                type: RECOVER_FAILED
            })
        }
    }
}

export function resetPassword(passwordValue) {

    return async function (dispatch) {

        dispatch({
            type: RESET_REQUEST,

        });

        try {
            const response = await fetch(`${API_PASSWORD_RESET}/password-reset/reset`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "password": passwordValue,
                        token: ''
                    }),
                });

            checkResponse(response).then(result =>

                dispatch({
                    type: RESET_SUCCESS,
                }))

        } catch (err) {

            dispatch({
                type: RESET_FAILED
            })
        }
    }
}

export function registerUser(nameValue, loginValue, passwordValue) {

    return async function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        })


        try {
            const response = await fetch(`${API_REGISTER}/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': loginValue,
                        'password': passwordValue,
                        'name': nameValue,
                    }),

                });

            checkResponse(response).then(result => {

                dispatch({
                    type: REGISTER_SUCCESS,
                    user: result.user,
                });
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAILED
            })
        }
    }
}

export function loginUser(loginValue, passwordValue) {

    return async function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        })

        try {
            const response = await fetch(`${API_LOGIN}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({

                        email: loginValue,
                        password: passwordValue
                    }),

                });

            checkResponse(response).then(result => {

                let authToken;

                if (result.accessToken.indexOf('Bearer') === 0) {
                    authToken = result.accessToken.split('Bearer')[1].trim();
                };

                if (authToken) {
                    Cookies.set('accessToken', authToken)
                };

                console.log(Cookies.get('accessToken'))
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: result.user

                })
            }
            )

        } catch (err) {
            dispatch({
                type: LOGIN_FAILED
            })
        }

    }
}


// вешать функции регистрации и авторизации на кнопки на страницах
// заголовок 'authorization' есть такой же как и 'content-type'