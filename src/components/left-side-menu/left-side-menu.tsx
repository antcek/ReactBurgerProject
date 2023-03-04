import React, {FC} from 'react';
import styles from './left-side-menu.module.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/thunk-actions/thunk-actions';
import { useDispatch } from '../../services/types/hooks';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IUseLocation } from '../../services/types/types';


export const LeftSideMenu: FC = () => {

  const dispatch = useDispatch();
  const location: IUseLocation = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <NavLink
          to='/profile'
          className={() =>
            classNames(`${location.pathname === '/profile' ? styles.elementActive
              : styles.elementDisactive}`,
            )}
        >
          <p className='text text_type_main-medium '>
            Профиль
          </p>

        </NavLink>
        <NavLink
          to='/profile/orders'
          className={() =>
            classNames(`${location.pathname === '/profile/orders' ? styles.elementActive
              : styles.elementDisactive}`,
            )}
        >
          <p className="text text_type_main-medium">
            История заказов
          </p>
        </NavLink>
        <div
          className={styles.logout}
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