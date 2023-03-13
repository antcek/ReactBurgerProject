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
    API_UPDATE_USER_INFO
} from "../../utils/api";
import { RECOVER_FAILED, RECOVER_SUCCESS, RECOVER_REQUEST } from "../actions/forgot-password";
import { RESET_FAILED, RESET_SUCCESS, RESET_REQUEST } from "../actions/reset-password";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, IUser } from "../actions/register";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_EXIT,
    LOGIN_EXIT_REQUEST,
    LOGIN_EXIT_FAILED,
    LOGIN_GET_DATA_REQUEST,
    LOGIN_GET_DATA_FAILED,
    LOGIN_GET_DATA,
    USER_UPDATE_INFO,
    USER_UPDATE_INFO_FAILED,
    USER_UPDATE_INFO_REQUEST,
} from "../actions/user";
import Cookies from 'js-cookie';
import { AppDispatch, AppThunk } from "../types/redux-index";
import { IIngredients } from "../types/types";

type TRecover = {
    success: boolean;
    message: string;
}

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};

const saveTokens = (refreshToken: string, accessToken: string): void => {
    Cookies.set('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}



export const getIngredients: AppThunk = () => {

    return async function (dispatch: AppDispatch) {
        dispatch({
            type: ALL_INGREDIENTS_REQUEST
        });

        try {
            const response = await fetch(`${BURGER_API_URL}/ingredients`);

            checkResponse<IIngredients>(response).then((ingredients) => {

                dispatch({
                    type: ALL_INGREDIENTS_SUCCESS,
                    products: ingredients.data
                })
            }
            );

        } catch (err) {
            dispatch({
                type: ALL_INGREDIENTS_FAILED,
            });

        };
    }

};


export const sendOrder: AppThunk = (idConstructor) => {
    return async function (dispatch: AppDispatch | AppThunk) {
        dispatch({
            type: ORDER_REQUEST
        });

        try {
            await fetchWithRefresh<TCreatePostResponse>(`${NORMA_API}/orders`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('accessToken')
                    },
                    body: JSON.stringify(idConstructor),
                })
                .then((result) => dispatch({
                    type: ORDER_SUCCESS,
                    orderNumber: result.order?.number
                }))

        } catch (err) {

            dispatch(userGetData());
            dispatch(sendOrder(idConstructor));

            dispatch({
                type: ORDER_FAILED
            });



        }
    }
}

export const recoverPassword: AppThunk = (loginValue: string) => {

    return async function (dispatch: AppDispatch) {

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

            checkResponse<TRecover>(response).then((result) => {

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



export const resetPassword: AppThunk = (passwordValue: string, tokenValue: string) => {

    return async function (dispatch: AppDispatch) {

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

            checkResponse<TRecover>(response).then((result) =>

                dispatch({
                    type: RESET_SUCCESS,
                    reset: result.success
                }))

        } catch (err) {

            dispatch({
                type: RESET_FAILED
            })
        }
    }
}

export const registerUser: AppThunk = (nameValue: string, loginValue: string, passwordValue: string) => {

    return async function (dispatch: AppDispatch) {
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

            checkResponse<IUser>(response).then(result => {

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

export const loginUser: AppThunk = (loginValue: string, passwordValue: string) => {

    return async function (dispatch: AppDispatch) {
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

                })
            checkResponse<IUser>(response).then(result => {

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
                    userAuthorizied: result.success

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

let tokenPromise: Promise<{ refreshToken: string, accessToken: string }> | null = null;

export const updateToken = async (): Promise<{ refreshToken: string, accessToken: string }> => {

    if (tokenPromise !== null) {
        return tokenPromise;
    }

    tokenPromise = fetch(`${API_REFRESH_TOKEN}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(res => {
            let accessToken = res.accessToken;
            let refreshToken = res.refreshToken;
            if (accessToken.indexOf('Bearer') === 0) {
                accessToken = accessToken.split('Bearer')[1].trim();
            };
            saveTokens(refreshToken, accessToken);

            return { refreshToken, accessToken }
        })
        .finally(() => {
            tokenPromise = null;
        });

    return tokenPromise;
}

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {

    try {

        const response = await fetch(url, options);
        return await checkResponse<T>(response);

    }
    catch (err) {

        if ((err as { message: string }).message === 'jwt expired') {

            const { refreshToken, accessToken } = await updateToken();

            saveTokens(refreshToken, accessToken);

            (options.headers as { [key: string]: string }).authorization = 'Bearer ' + accessToken;

            const response = await fetch(url, options);

            return await checkResponse<T>(response);

        } else {

            return Promise.reject(err);
        }
    }
}



export const logout: AppThunk = () => {

    return async function (dispatch: AppDispatch) {

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

            checkResponse<TRecover>(response).then(result => {

                localStorage.removeItem('refreshToken');
                Cookies.remove('accessToken');

                dispatch({
                    type: LOGIN_EXIT,
                    userAuthorizied: !result.success,
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
type TServerResponse<T> = {
    success: boolean;
    user?: IUser;
    order?: {
        number: number
    }

} & T;

type TPost = {
    title: string;
    description: string;
};

type TCreatePostResponse = TServerResponse<TPost>;

export const userGetData: AppThunk = () => {

    return async function (dispatch: AppDispatch | AppThunk) {

        dispatch({
            type: LOGIN_GET_DATA_REQUEST
        })

        try {
            await fetchWithRefresh<TCreatePostResponse>(`${API_GET_USER_INFO}/auth/user`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('accessToken')
                    },

                }).then((result) => {

                    dispatch({
                        type: LOGIN_GET_DATA,
                        user: result.user,
                        userAuthorizied: true,
                    });

                })
        } catch (err) {

            dispatch({
                type: LOGIN_GET_DATA_FAILED
            });

            dispatch(userGetData());

        }
    }
}

export const updateUserInfo: AppThunk = (nameValue: string, loginValue: string, passwordValue: string) => {

    return async function (dispatch: AppDispatch | AppThunk) {

        dispatch({
            type: USER_UPDATE_INFO_REQUEST
        });
        try {

            await fetchWithRefresh<TCreatePostResponse>(`${API_UPDATE_USER_INFO}/auth/user`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('accessToken')
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        email: loginValue,
                        password: passwordValue
                    })

                }).then((result) => {

                    dispatch({
                        type: USER_UPDATE_INFO,
                        user: result.user,

                    });

                });

        } catch (err) {
            dispatch(updateUserInfo());

            dispatch({
                type: USER_UPDATE_INFO_FAILED
            })

        }

    }
}
