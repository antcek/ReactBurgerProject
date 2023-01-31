import React, { useState, useRef, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { logout } from '../../services/thunk-actions/thunk-actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function ProfilPage() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState('');
  const inputRef = useRef(null);

  const [loginValue, setLoginValue] = useState('')
  const onLoginChange = e => {
    setLoginValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };

  const isUserLogged = useSelector(store => store.loginUser.user);
  // const refreshToken = localStorage.getItem('refreshToken');

console.log(isUserLogged)

  useEffect(() => {
    if (isUserLogged === null ) {
      navigate('/login', { replace: true })
    }
  }, [isUserLogged,navigate]);

 console.log(Cookies.get('accessToken'))
 console.log(localStorage.getItem('refreshToken'))
 
  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.menu}>
            <NavLink
              to='/profile'
              style={({ isActive }) => ({
                color: isActive ? 'white' : ''
              })}
              className={({ isActive }) =>

                isActive ? classNames(styles.menu) : classNames(styles.menu, 'text_color_inactive',)
              }
            >
              <p className="text text_type_main-medium">
                Профиль
              </p>
            </NavLink>
            <p className="text text_type_main-medium text_color_inactive">
              История заказов
            </p>
            <div onClick={ () => {
              
              dispatch(logout())}}>
              <p className={`text text_type_main-medium text_color_inactive ${styles.logout}`}>
                Выход
              </p>
            </div>
          </div>
          <p className="text text_type_main-default text_color_inactive ">
            В этом разделе вы можете
            изменить свои персональные данные
          </p>
        </div>
        <div className={styles.info}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputRef}
            icon="EditIcon"
            errorText={'Ошибка'}
            size={'default'}
          />
          <EmailInput onChange={onLoginChange}
            value={loginValue}
            name={'email'}
            isIcon={false}
            icon="EditIcon"
            placeholder={'Логин'} />

          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}

          />
        </div>
      </div>
    </>
  )
}