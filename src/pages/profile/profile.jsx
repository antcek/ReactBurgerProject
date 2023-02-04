import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {  updateUserInfo } from '../../services/thunk-actions/thunk-actions';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { userGetData } from '../../services/thunk-actions/thunk-actions';
import { LeftSideMenu } from '../../components/left-side-menu/left-side-menu';


export function ProfilPage() {

  const dispatch = useDispatch();

  const [nameValue, setNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };

  const isUserLogged = useSelector(store => store.loginUser.userAuthorizied);
  const userData = useSelector(store => store.loginUser.user);
  const accessToken = Cookies.get('accessToken');

  const isChanging = () => {
    if (userData && (loginValue !== userData.email ||
      nameValue !== userData.name ||
      passwordValue !== '')) {

      return true
    }

    else return false
  }

  useEffect(() => {

    if (userData) {
      setLoginValue(userData?.email);
      setNameValue(userData?.name);
    }

  }, [isUserLogged, userData, accessToken,]);

  useEffect(() => {

    if (accessToken) {
      dispatch(userGetData());
    };

  }, [dispatch, accessToken])

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateUserInfo(nameValue, loginValue, passwordValue));
    setPasswordValue('')
  }

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <LeftSideMenu />
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
              <Button onClick={() => {
                if (userData) {
                  setLoginValue(userData?.email);
                  setNameValue(userData?.name);
                }
              }} htmlType="submit" type="primary" size="medium">
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