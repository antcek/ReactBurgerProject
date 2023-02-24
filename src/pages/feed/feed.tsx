import React, { FC } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';


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
        <div className={styles.cardWrapper}>
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
                {/* выводить массив через arr.reverse.map ...  */}
                <svg className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g clip-path="url(#clip0_16791_2983)">
                    <rect width="64" height="64" rx="32" fill="#131316" />
                    <mask id="mask0_16791_2983" maskUnits="userSpaceOnUse" x="-24" y="4" width="112" height="56">
                      <rect x="-24" y="4" width="112" height="56" fill="black" />
                    </mask>
                    <g mask="url(#mask0_16791_2983)">
                      <rect x="-24" y="4" width="112" height="56" fill="url(#pattern0)" />
                    </g>
                  </g>
                  <rect x="1" y="1" width="62" height="62" rx="31" stroke="url(#paint0_linear_16791_2983)" stroke-width="2" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_16791_2983" transform="scale(0.00150602 0.00301205)" />
                    </pattern>
                    <linearGradient id="paint0_linear_16791_2983" x1="1.44676e-06" y1="64" x2="76.7401" y2="25.1941" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#801AB3" />
                      <stop offset="1" stop-color="#4C4CFF" />
                    </linearGradient>
                    <clipPath id="clip0_16791_2983">
                      <rect width="64" height="64" rx="32" fill="white" />
                    </clipPath>
                  </defs>
                  <image xlinkHref={`https://code.s3.yandex.net/react/code/bun-01.png`} width="112" height="56" x="0" y="0" />
                </svg>
                <svg className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g clip-path="url(#clip0_16791_2983)">
                    <rect width="64" height="64" rx="32" fill="#131316" />
                    <mask id="mask0_16791_2983" maskUnits="userSpaceOnUse" x="-24" y="4" width="112" height="56">
                      <rect x="-24" y="4" width="112" height="56" fill="black" />
                    </mask>
                    <g mask="url(#mask0_16791_2983)">
                      <rect x="-24" y="4" width="112" height="56" fill="url(#pattern0)" />
                    </g>
                  </g>
                  <rect x="1" y="1" width="62" height="62" rx="31" stroke="url(#paint0_linear_16791_2983)" stroke-width="2" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_16791_2983" transform="scale(0.00150602 0.00301205)" />
                    </pattern>
                    <linearGradient id="paint0_linear_16791_2983" x1="1.44676e-06" y1="64" x2="76.7401" y2="25.1941" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#801AB3" />
                      <stop offset="1" stop-color="#4C4CFF" />
                    </linearGradient>
                    <clipPath id="clip0_16791_2983">
                      <rect width="64" height="64" rx="32" fill="white" />
                    </clipPath>
                  </defs>

                </svg>
                {/* для бургера с длинной >5 - отдельно выводить круг с opacity 0.6 с условным рендером */}
              </div>

              <div className={styles.price}>
                <p className="text text_type_digits-default">480</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.currentOrders}>
            <div className={styles.currentTop} >
              <h2 className="text text_type_main-medium pb-6">
                Готовы:
              </h2 >
              <div className={styles.readyOrders}>
                <p className="text text_type_digits-default ">034533</p>
                <p className="text text_type_digits-default ">034532</p>
                <p className="text text_type_digits-default ">034537</p>
                <p className="text text_type_digits-default ">034530</p>
                <p className="text text_type_digits-default ">034536</p>
              </div>
            </div>
            <div className={styles.currentTop}>
              <h2 className="text text_type_main-medium pb-6">
                В работе:
              </h2 >
              <div className={styles.upcomingOrders}>
                <p className="text text_type_digits-default ">034538</p>
                <p className="text text_type_digits-default ">034541</p>
                <p className="text text_type_digits-default ">034542</p>
              </div>
            </div>
          </div>
          <h2 className="text text_type_main-medium">
            Выполнено за все время:
          </h2 >
          <p className={`text text_type_digits-large pb-15 ${styles.numbers}`}>28 752</p>
          <h2 className="text text_type_main-medium">
            Выполнено за сегодня:
          </h2 >
          <p className={`text text_type_digits-large ${styles.numbers}`}>138</p>
        </div>
      </div>
    </>
  )
}
