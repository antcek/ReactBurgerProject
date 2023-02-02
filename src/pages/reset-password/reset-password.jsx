import React, { useState, useRef, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './reset-password.module.css';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/thunk-actions/thunk-actions';


export function ResetPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tokenValue, setTokenValue] = useState('');
  const inputRef = useRef(null);
  const loggedUser = useSelector(store => store.loginUser.userAuthorizied);
  const isEmailSended = useSelector(store => store.recoverPassword.recoverSuccess)
  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  };
  
  const isPasswordReset = useSelector(store => store.resetPassword.resetSuccess)
console.log(isPasswordReset)
  const sendResetRequest = async () => {
    if (passwordValue.length > 5) {
    dispatch(resetPassword(passwordValue, tokenValue));
    }
  }

  useEffect(() => {
    if (loggedUser) {
      navigate(-1, { replace: true })
    };

    if (!loggedUser && !isEmailSended) {
      navigate('/forgot-password', { replace: true })
    };

    if (isPasswordReset) {
      navigate('/login', {replace:true})
    }
  }, [loggedUser, navigate, isEmailSended,isPasswordReset])


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