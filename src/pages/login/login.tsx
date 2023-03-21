import React, { useEffect, useState, FC } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { loginUser } from '../../services/thunk-actions/thunk-actions';
import { REGISTER_SUCCESS } from '../../services/actions/register';


export const LoginPage: FC = () => {

  const dispatch = useDispatch();
  const loggedUser = useSelector((store) => store.loginUser.userAuthorizied);
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState('');

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = useState('');

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value)
  }

  useEffect(() => {

    if (loggedUser) {
      return navigate('/', { replace: true })
    }
  }, [loggedUser, navigate]);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (passwordValue.length > 5) {
      dispatch(loginUser(loginValue, passwordValue))
    };
  }


  return (
    <>
      <AppHeader />
      <div className={styles.loginContainer} >
        <p className="text text_type_main-large">
          Вход
        </p>
        <form data-testid="login-form" onSubmit={handleSubmit} className={styles.form}>
          <EmailInput
            onChange={onLoginChange}
            value={loginValue}
            name={'email'}
            isIcon={false} 
            id="login-email-input"/>
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}
            id="login-password-input"
          />

          <Button id="login-button" htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>
      </div>
      <div className={styles.hints}>
        <div className={styles.loginHelp}>
          <p className="text text_type_main-default  text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to='/register'>
            <Button onClick={() => dispatch({
              type: REGISTER_SUCCESS,
              user: false
            })} htmlType="button" type="secondary" size="medium" extraClass={styles.buttons}>
              Зарегистрироваться
            </Button>
          </Link>
        </div>
        <div className={styles.loginHelp}>
          <p className="text text_type_main-default  text_color_inactive">
            Забыли пароль?
          </p>
          <Link to='/forgot-password'>
            <Button htmlType="button" type="secondary" size="medium" extraClass={styles.buttons}>
              Восстановить пароль
            </Button>
          </Link>
        </div>
      </div>

    </>

  )


}
