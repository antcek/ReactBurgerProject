import React, { useState, useEffect, FC } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './forgot-password.module.css';
import { EmailInput, Button, } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { recoverPassword } from '../../services/thunk-actions/thunk-actions';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/constants';

const ForgotPasswordPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRecovered = useSelector((store) => store.recoverPassword.recoverSuccess);
  const loggedUser = useSelector((store) => store.loginUser.userAuthorizied)

  const [loginValue, setLoginValue] = useState('');

  const onLoginForgot = (e: React.ChangeEvent<HTMLInputElement>): void => {

    setLoginValue(e.target.value)
  };

  useEffect(() => {
    if (passwordRecovered) {
      navigate('/reset-password', { replace: true })
    }
    if (loggedUser) {
      navigate(-1)
    }
  }, [passwordRecovered, navigate, loggedUser]);

  const handleSubmitRecover = (event: React.FormEvent): void => {

    event.preventDefault();

    if (validateEmail(loginValue)) {
      dispatch(recoverPassword(loginValue))
    }
  }


  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <p className="text text_type_main-medium ">
          Восстановление пароля
        </p>
        <form onSubmit={handleSubmitRecover} className={styles.form}>
          <EmailInput onChange={onLoginForgot}
            value={loginValue}
            name={'email'}
            isIcon={false}
            placeholder="Укажите e-mail"
          />

          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </form>
      </div>
      <div className={styles.forgotPassword}>
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
export default ForgotPasswordPage