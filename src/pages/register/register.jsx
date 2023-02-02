import React, { useState,  useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './register.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/thunk-actions/thunk-actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export function RegisterPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registeredUser = useSelector(store => store.registerUser.registerNewUser);
  const loggedUser = useSelector(store => store.loginUser.userAuthorizied);
  const [nameValue, setNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');

  const onLoginRegister = e => {
    setLoginValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = useState('');
  const onPasswordRegister = e => {
    setPasswordValue(e.target.value)
  };

  function isRegistered() {

    dispatch(registerUser(nameValue, loginValue, passwordValue));
  };

  useEffect(() => {
    if (registeredUser && !loggedUser) {
      navigate('/login', {replace:true})
    }

    if (loggedUser) {
      navigate(-1, {replace:true})
    }
  }, [registeredUser,loggedUser,navigate]);

  

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

          errorText={'Ошибка'}
          size={'default'}
        />
        <EmailInput onChange={onLoginRegister}
          value={loginValue}
          name={'email'}
          isIcon={false} />
        <PasswordInput
          onChange={onPasswordRegister}
          value={passwordValue}
          name={'password'}
        />


        <Button onClick={isRegistered}
          htmlType="button" type="primary" size="large">
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