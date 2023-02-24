import React, { FC } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';


// оставить для 5 спринта
export const FeedPage: FC = () => {

  const today = new Date();

  return (
    <>
      <AppHeader />
      <div className={styles.heading}>
        <h1 className="text text_type_main-large mt-10">
          Лента заказов
        </h1 >
      </div>
      <div className={styles.container}>

        <div className={styles.order}>
          <div className={styles.cardTop}>
            <p className="text text_type_digits-default">#034535</p>
            <FormattedDate
              date={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  today.getHours(),
                  today.getMinutes() - 1,
                  0,
                )
              }
              className={styles.date}
            />
          </div>
          <h1 className="text text_type_main-medium ">
            Death Star Starship Main бургер
          </h1 >
          <div className={styles.cardBottom}>
            <div className={styles.burger}>
              <div className={styles.ingredient}>
                <img src='https://code.s3.yandex.net/react/code/bun-01.png' />
                <div className={styles.ingredientContent}>
                </div>
              </div>
              <div className={styles.ingredient}>
                <img src='https://code.s3.yandex.net/react/code/bun-01.png' />
                <div className={styles.ingredientContent}>
                </div>
              </div>
              <div className={styles.ingredient}>
                <img src='https://code.s3.yandex.net/react/code/bun-01.png' />
                <div className={styles.ingredientContent}>
                </div>
              </div>
              
            
            </div>


            <div className={styles.price}>
              <p className="text text_type_digits-default">480</p>

              <CurrencyIcon type="primary" />
            </div>
          </div>

        </div>

        <div className={styles.details}>

        </div>
      </div>
    </>
  )
}
