import React from 'react';
import styles from './left-side-menu.module.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/thunk-actions/thunk-actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';


export const LeftSideMenu = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <NavLink
          to='/profile'
          style={() => ({
            color: `#8585AD` ,
            textDecoration: 'none'
          })}
         
        >
          <p className={`text text_type_main-medium ${location.pathname === '/profile' ?
            styles.element : ''} `} >
            Профиль
          </p>

        </NavLink>
        <NavLink
          to='/profile/orders'
          style={({ isActive }) => ({

            color: isActive ? 'white' : '',
            textDecoration: 'none'
          })}
          className={({ isActive }) =>

            isActive ? '' : classNames('text_color_inactive',)
          }
        >
          <p className="text text_type_main-medium">
            История заказов
          </p>
        </NavLink>
        <div
          onClick={() => {
            dispatch(logout());
          }}
        >
          <p className={`text text_type_main-medium text_color_inactive ${styles.logout}`}>
            Выход
          </p>
        </div>
      </div>
      <p className="text text_type_main-default text_color_inactive  ">
        В этом разделе вы можете
        изменить свои персональные данные
      </p>
    </div>
  )
}