import React, { useState, useRef } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './register.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';

export function RegisterPage() {

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

  return (
    <>
    
      <AppHeader />

      <div className={styles.registerContainer}>
        <p className="text text_type_main-large">
          Регистрация
        </p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputRef}

          errorText={'Ошибка'}
          size={'default'}
        />
        <EmailInput onChange={onLoginChange}
          value={loginValue}
          name={'email'}
          isIcon={false} />
        <PasswordInput
          onChange={onPasswordChange}
          value={passwordValue}
          name={'password'}
        />
        <Button htmlType="button" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.registerHelp}>
        <p className="text text_type_main-default  text_color_inactive">
        Уже зарегистрированы?
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