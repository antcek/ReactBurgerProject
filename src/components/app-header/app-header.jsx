
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

    const currentPath = useLocation().pathname;


    return (
        <header className={styles.header}>

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <NavLink
                        to='/'

                        className={({ isActive }) =>
                            classNames(styles.element, { 'text_color_inactive': !isActive },
                                `${isActive ? styles.activeElement : !isActive ?
                                    styles.iconHover : 'text_color_inactive'}`)

                        }>
                        <BurgerIcon type={(currentPath === '/')
                            ? 'primary' : "secondary"} />
                        <p className="text text_type_main-default  ">
                            Конструктор</p>
                    </NavLink>
                    <NavLink
                        to='*'
                        className={({ isActive }) =>
                            classNames(styles.element, { 'text_color_inactive': !isActive },
                                `${isActive ? styles.activeElement :
                                    !isActive ?
                                        styles.iconHover : 'text_color_inactive'}`)

                        }
                    >
                        <ListIcon type={currentPath === '/orders' ? 'primary' : "secondary"} />
                        <p className="text text_type_main-default  ">
                            Лента заказов</p>
                    </NavLink>
                </div>

                <NavLink to='/' className={styles.logo}>
                    <Logo />
                </NavLink>

                <NavLink
                    to='/profile'
                    className={({ isActive }) =>
                        classNames(styles.element, { 'text_color_inactive': !isActive },
                            `${isActive ? styles.activeElement :
                                !isActive ?
                                    styles.iconHover : 'text_color_inactive'}`)
                    }

                >
                    <ProfileIcon type={currentPath === '/profile' ? 'primary' :
                        currentPath === '/profile/orders' ? 'primary' : 'secondary'} />
                    <p className="text text_type_main-default  " >
                        Личный кабинет</p>

                </NavLink>
            </div>
        </header >
    );
}


export default AppHeader;