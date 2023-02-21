import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export const Error404Page:FC = () => {

  return (

    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.text}>
          <p className="text text_type_main-large">Ничего себе! Ошибка 404</p>
          <p className="text text_type_main-medium">Страница, на которую вы пытаетесь перейти, не существует</p>
          <p className="text text_type_main-medium">Проверьте адрес или попытайтесь
            <Link to='/' className={styles.link}>вернуться</Link> </p>
        </div>
      </div>
    </div>

  )
}