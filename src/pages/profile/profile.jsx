import React, { useState, useRef, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { logout, updateUserInfo } from '../../services/thunk-actions/thunk-actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



export function ProfilPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef();

  const [nameValue, setNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');


  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };


  const isUserLogged = useSelector(store => store.loginUser.userAuthorizied);
  const userData = useSelector(store => store.loginUser.user);
  const accessToken = Cookies.get('accessToken')

  const isChanging = () => {
    if (userData && (loginValue !== userData.email ||
      nameValue !== userData.name ||
      passwordValue !== ''))
      return true

    else return false
  }
    
  useEffect(() => {
    if (!isUserLogged && !accessToken) {
      navigate('/login', { replace: true })
    };

    if (userData) {
      setLoginValue(userData?.email);
      setNameValue(userData?.name);
    }
  }, [isUserLogged, navigate, userData,accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserInfo(nameValue, loginValue, passwordValue));
    setPasswordValue('')
  }

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.menu}>
            <NavLink
              to='/profile'
              style={({ isActive }) => ({
                color: isActive ? 'white' : '',
                textDecoration: isActive ? 'none' : ''
              })}

            >
              <p className="text text_type_main-medium">
                Профиль
              </p>
            </NavLink>
            <p className="text text_type_main-medium text_color_inactive">
              История заказов
            </p>
            <div
              onClick={() => { dispatch(logout()) }}
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
        <div className={styles.form} >
          <form onSubmit={handleSubmit} className={styles.info} >
            <Input

              placeholder={'Имя'}
              onChange={e => {
                isChanging();
                setNameValue(e.target.value)
              }
              }
              value={nameValue}
              name={'name'}
              error={false}
              ref={nameRef}
              icon="EditIcon"
              errorText={'Ошибка'}
              size={'default'}

            />
            <EmailInput onChange={(e) => {
              isChanging();
              setLoginValue(e.target.value);
            }}
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

            {isChanging() ? <div className={styles.formButtons}>
              <Button  htmlType="submit" type="primary" size="medium">
                Отмена
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="medium">
                Изменить
              </Button>
            </div> : null}
          </form>

        </div>
      </div>

    </>
  )
}