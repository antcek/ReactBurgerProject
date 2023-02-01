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
    API_GET_USER_INFO,
} from "../../utils/api";
import { RECOVER_FAILED, RECOVER_SUCCESS, RECOVER_REQUEST } from "../actions/forgot-password";
import { RESET_FAILED, RESET_SUCCESS, RESET_REQUEST } from "../actions/reset-password";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/register";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_EXIT,
    LOGIN_EXIT_REQUEST,
    LOGIN_EXIT_FAILED,
    LOGIN_GET_DATA_REQUEST,
    LOGIN_GET_DATA_FAILED,
    LOGIN_GET_DATA
} from "../actions/login";
import Cookies from 'js-cookie';


const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};

const saveTokens = (refreshToken, accessToken) => {
    Cookies.set('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
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

            checkResponse(response).then(result => {

                dispatch({
                    type: RECOVER_SUCCESS,
                    success: result.success
                })
            })


        } catch (err) {

            dispatch({
                type: RECOVER_FAILED
            })
        }
    }
}

export function resetPassword(passwordValue, tokenValue) {

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
                        'token': tokenValue
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
                    user: true

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
            await fetchWithRefresh(`${API_LOGIN}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        email: loginValue,
                        password: passwordValue
                    }),

                })
                .then(result => {

                    let accessToken;

                    if (result.accessToken.indexOf('Bearer') === 0) {
                        accessToken = result.accessToken.split('Bearer')[1].trim();
                    };

                    if (accessToken) {
                        Cookies.set('accessToken', accessToken)
                    };

                    localStorage.setItem('refreshToken', result.refreshToken)

                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: result.success

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

export const updateToken = () => {

    return fetch(`${API_REFRESH_TOKEN}/auth/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                'token': localStorage.getItem('refreshToken')
            }),
        }).then(checkResponse)


}
console.log(updateToken())
export const fetchWithRefresh = async (url, options) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse(response);
    }
    catch (err) {

        if (err.message === 'jwt expired') {

            let { refreshToken, accessToken } = await updateToken();

            if (accessToken.indexOf('Bearer') === 0) {
                accessToken = accessToken.split('Bearer')[1].trim();
            };

            saveTokens(refreshToken, accessToken)

            options.headers.authorization = 'Bearer ' + accessToken;

            const response = await fetch(url, options);

            return await checkResponse(response);
        } else {
            console.log('ошибка не jwt expired')
            return Promise.reject(err);
        }
    }
}



export function logout() {

    return async function (dispatch) {

        dispatch({
            type: LOGIN_EXIT_REQUEST
        })

        try {

            const response = await fetch(`${API_LOGOUT}/auth/logout`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem('refreshToken')
                    }),
                });

            checkResponse(response).then(result => {

                localStorage.removeItem('refreshToken');
                Cookies.remove('accessToken');

                dispatch({
                    type: LOGIN_EXIT,
                    userAuthorizied: false,
                    user: null
                })

            }
            )

        } catch (err) {
            dispatch({
                type: LOGIN_EXIT_FAILED
            })
        }


    }
}

export function userGetData() {

    return async function (dispatch) {

        dispatch({
            type: LOGIN_GET_DATA_REQUEST
        })

        try {
            console.log(Cookies.get('accessToken'))
            await fetchWithRefresh(`${API_GET_USER_INFO}/auth/user`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('accessToken')
                    },

                }).then(result => {

                    console.log(result)
                    dispatch({
                        type: LOGIN_GET_DATA,
                        user: result.user,
                        userAuthorizied: true,
                    })

                }
                )

        } catch (err) {

            dispatch({
                type: LOGIN_GET_DATA_FAILED
            })
        }
    }
}


// GET ../user - при переходе на profile (отправляем accessToken)
// Patch ../user  - при нажатии 'сохранить' информацию
// АПДЕЙТ ТОКЕН РАБОТАЕТ ПЕРВЫЙ РАЗ !! после него надо сохранить токены и потом уже вызывать дальше