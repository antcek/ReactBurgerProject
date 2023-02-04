import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUserInfo } from '../../services/thunk-actions/thunk-actions';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { userGetData } from '../../services/thunk-actions/thunk-actions';
import { LeftSideMenu } from '../../components/left-side-menu/left-side-menu';
import { useForm } from '../../services/custom-hooks/custom-hooks';


const inputValues = {
  name: '',
  email: '',
  password: ''
};

export function ProfilPage() {

  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm(inputValues);

  const userData = useSelector(store => store.loginUser.user);
  const accessToken = Cookies.get('accessToken');

  const isChanging = () => {

    if (userData && (values.email !== userData.email ||
      values.name !== userData.name ||
      values.password !== '')) {

      return true
    }

    else return false
  }

  useEffect(() => {

    if (userData) {
      values.name = userData?.name;
      values.email = userData?.email
    }

  }, [userData, accessToken]);

  useEffect(() => {

    if (accessToken) {
      dispatch(userGetData());
    };

  }, [dispatch, accessToken])

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateUserInfo(values.name, values.email, values.password));
    values.password = ''
  }

  const dataReset = () => {
    if (userData) {
      values.email = userData?.email;
      values.name = userData?.name;
    }
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
              onChange={handleChange}
              value={values.name}
              name={'name'}
              error={false}
              icon="EditIcon"
              errorText={'Ошибка'}
              size={'default'}
            />
            <EmailInput onChange={handleChange}
              value={values.email}
              name={'email'}
              isIcon={false}
              icon="EditIcon"
              placeholder={'Логин'} />

            <PasswordInput
              onChange={handleChange}
              value={values.password}
              name={'password'}

            />

            {isChanging() ? <div className={styles.formButtons}>
              <Button onClick={dataReset} htmlType="submit" type="primary" size="medium">
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