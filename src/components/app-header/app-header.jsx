
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { HEADER_CONSTRUCTOR_ACTIVE, HEADER_FEED_ACTIVE, HEADER_PROFILE_ACTIVE } from '../../services/actions/app-header';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userGetData } from '../../services/thunk-actions/thunk-actions';



function AppHeader() {

    const { isConstructorActive, isFeedActive, isProfileActive } = useSelector(store => store.setActive);
    const dispatch = useDispatch();
    


    return (
        <header className={styles.header}>

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <NavLink
                        to='/'
                        style={({ isActive }) => ({
                            color: isActive ? 'white' : ''
                        })}
                        className={({ isActive }) =>

                            isActive ? classNames(styles.element) : classNames(styles.element, 'text_color_inactive',)
                        }
                        onClick={() => {
                            dispatch({
                                type: HEADER_CONSTRUCTOR_ACTIVE,
                                isActive: true
                            })
                        }
                        }
                    >
                        <BurgerIcon type={(isConstructorActive)
                            ? 'primary' : "secondary"} />
                        <p className="text text_type_main-default  ">
                            Конструктор</p>
                    </NavLink>
                    <NavLink
                        to='*'
                        style={({ isActive }) => ({
                            color: isActive ? 'white' : ''
                        })}
                        className={({ isActive }) =>
                            isActive ? classNames(styles.element) : classNames(styles.element, 'text_color_inactive',)
                        }
                    >
                        <ListIcon type={isFeedActive ? 'primary' : "secondary"} />
                        <p className="text text_type_main-default  ">
                            Лента заказов</p>
                    </NavLink>
                </div>

                <NavLink to='/'
                    onClick={() => dispatch({
                        type: HEADER_CONSTRUCTOR_ACTIVE,
                        isActive: true
                    })}
                    className={styles.logo}>
                    <Logo />
                </NavLink>

                <NavLink
                    to='/profile'
                    style={({ isActive }) => ({
                        color: isActive ? 'white' : ''
                    })}
                    className={({ isActive }) =>

                        isActive ? classNames(styles.element) : classNames(styles.element, 'text_color_inactive',)
                    }
                    onClick={() => {
                        dispatch({
                            type: HEADER_PROFILE_ACTIVE,
                            isActive: true
                        });
                       dispatch(userGetData())
                    }
                    }
                >
                    <ProfileIcon type={isProfileActive ? 'primary' : "secondary"} />
                    <p className="text text_type_main-default  " >
                        Личный кабинет</p>

                </NavLink>
            </div>
        </header >
    );
}


export default AppHeader;