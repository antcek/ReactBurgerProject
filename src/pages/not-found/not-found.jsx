import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export function Error404Page() {

  return (
    
    <div className={styles.wrapper}> 
    
      <div className={styles.container}>
     
        <div className={styles.content}>
     <p className="text text_type_main-large">Упс! Ошибка 404</p>
          <p className="text text_type_main-medium">Страница, на которую вы пытаетесь перейти не существует</p>
          <p className="text text_type_main-medium">Проверьте адресс или попытайтесь
            <Link to='/' className={styles.link}>вернуться</Link> </p>
        </div>
      </div>
      </div>
    
  )
}