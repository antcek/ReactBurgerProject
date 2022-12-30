import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.module.css'
import headerStyles from './app-header.module.css';

function AppHeader() {

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.wrapper}>

                    <a className={headerStyles.element} href='#'>
                        <BurgerIcon type="primary" />
                        <p href='#' className="text text_type_main-default ">
                            Конструктор</p>
                    </a>

                    <a href='#' className={headerStyles.element}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive ">
                            Лента заказов</p>
                    </a>
                </div>
                <a href='#' className={headerStyles.logo}>
                    <Logo />
                </a>

                <a href='#' className={headerStyles.element}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive " >
                        Личный кабинет</p>
                </a>
            </div>
        </header >
    );
}


export default AppHeader;