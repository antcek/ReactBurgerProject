
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';


function AppHeader() {

    const currentPath = useLocation().pathname


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

                            isActive ? classNames(styles.element) :
                                classNames(styles.element, 'text_color_inactive',)
                        }
                        onClick={() => {

                        }
                        }
                    >
                        <BurgerIcon type={(currentPath === '/')
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
                            isActive ? classNames(styles.element) :
                                classNames(styles.element, 'text_color_inactive',)
                        }
                    >
                        <ListIcon type={currentPath === '/orders' ? 'primary' : "secondary"} />
                        <p className="text text_type_main-default  ">
                            Лента заказов</p>
                    </NavLink>
                </div>

                <NavLink to='/'

                    className={styles.logo}>
                    <Logo />
                </NavLink>

                <NavLink
                    to='/profile'
                    style={({ isActive }) => ({
                        color: isActive ? 'white' : ''
                    })}
                    className={({ isActive }) =>

                        isActive ? classNames(styles.element) :
                            classNames(styles.element, 'text_color_inactive',)
                    }

                >
                    <ProfileIcon type={currentPath === '/profile' ? 'primary' : "secondary"} />
                    <p className="text text_type_main-default  " >
                        Личный кабинет</p>

                </NavLink>
            </div>
        </header >
    );
}


export default AppHeader;