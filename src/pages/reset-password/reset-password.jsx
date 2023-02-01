import React, { useState, useRef,useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './reset-password.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/thunk-actions/thunk-actions';



export function ResetPasswordPage() {

  const dispatch = useDispatch();

  const [tokenValue, setTokenValue] = useState('');
  const inputRef = useRef(null);

  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };
  
  const sendResetRequest = async () => {
    dispatch(resetPassword(passwordValue,tokenValue));
   
  }

 
  

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <p className="text text_type_main-medium ">
          Восстановление пароля
        </p>
        <PasswordInput
          onChange={onPasswordChange}
          value={passwordValue}
          name={'password'}
          placeholder={'Введите новый пароль'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setTokenValue(e.target.value)}
          value={tokenValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button onClick={sendResetRequest} htmlType="button" type="primary" size="large">
          Сохранить
        </Button>
      </div>
      <div className={styles.resetPassword}>
        <p className="text text_type_main-default  text_color_inactive">
          Вмпомнили пароль?
        </p>
        <Link to='/login'>
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.button}>
            Войти
          </Button>
        </Link>
      </div>
    </>
  )
}