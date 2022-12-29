import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

import PropTypes from 'prop-types';


function AppHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ">
                        Конструктор</p>

                </div>
                <div className={styles.container}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">
                        Лента заказов</p>
                </div>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.container}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет</p>
            </div>

        </header>
    );
}

AppHeader.propTypes = {

}

export default AppHeader;