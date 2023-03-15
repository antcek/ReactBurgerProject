import React, { useState, useEffect, FC } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './reset-password.module.css';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { resetPassword } from '../../services/thunk-actions/thunk-actions';


export const ResetPasswordPage:FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tokenValue, setTokenValue] = useState('');

  const loggedUser = useSelector((store) => store.loginUser.userAuthorizied);
  const isEmailSended = useSelector((store) => store.recoverPassword.recoverSuccess)
  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value)
  };

  const isPasswordReset = useSelector((store) => store.resetPassword.resetSuccess)

  useEffect(() => {
    if (loggedUser) {
      navigate(-1)
    };

    if (!loggedUser && !isEmailSended) {
      navigate('/forgot-password', { replace: true })
    };

    if (isPasswordReset) {
      navigate('/login', { replace: true })
    }
  }, [loggedUser, navigate, isEmailSended, isPasswordReset])

  const handleSubmitReset = (event: React.FormEvent): void => {

    event.preventDefault();
    if (passwordValue.length > 5) {
      dispatch(resetPassword(passwordValue, tokenValue));
    }

  }

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <p className="text text_type_main-medium ">
          Восстановление пароля
        </p>
        <form onSubmit={handleSubmitReset} className={styles.form}>
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
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </form>
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