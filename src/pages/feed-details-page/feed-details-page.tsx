import React, { FC, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './feed-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useOrderFullPrice } from '../../services/custom-hooks/custom-hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/web-socket';
import { useLocation } from 'react-router';
import { IUseLocation } from '../../services/types/types';

export const FeedDetailsPage: FC = () => {

  const dispatch = useDispatch();
  const location: IUseLocation = useLocation();


  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  const wsData = useSelector(store => store.wsReducer);
  const allIngredients = useSelector(store => store.getProducts.products);
  const targetOrder = wsData.messages[wsData.messages.length - 1]?.orders?.find(order => order?._id === location.pathname.slice(6));
  const orderAllData = targetOrder?.ingredients?.map(orderItem => {

    return allIngredients?.find(ingredient => (ingredient._id === orderItem))
  });

  const orderPrice = useOrderFullPrice(targetOrder);

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.number}>
          <p className="text text_type_digits-default pb-10">{`#${targetOrder?.number}`}</p>
        </div>
        <p className="text text_type_main-medium pb-3">
          {targetOrder?.name}
        </p>
        <p className={`text text_type_main-default pb-15 ${styles.textColor}`}>
          {targetOrder?.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
        <p className="text text_type_main-medium pb-6">
          Состав:
        </p>
        <div className={styles.structure}>

          {orderAllData?.map((ingredient, index) => {

            return (<div key={index} className={styles.info}>
              <svg className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g clipPath="url(#clip0_16791_2983)">
                  <rect width="64" height="64" rx="32" fill="#131316" />
                  <mask id="mask0_16791_2983" maskUnits="userSpaceOnUse" x="-24" y="4" width="112" height="56">
                    <rect x="-24" y="4" width="112" height="56" fill="black" />
                  </mask>
                  <g mask="url(#mask0_16791_2983)">
                    <rect x="-24" y="4" width="112" height="56" fill="url(#pattern0)" />
                  </g>
                </g>
                <rect x="1" y="1" width="62" height="62" rx="31" stroke="url(#paint0_linear_16791_2983)" strokeWidth="2" />
                <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_16791_2983" transform="scale(0.00150602 0.00301205)" />
                  </pattern>
                  <linearGradient id="paint0_linear_16791_2983" x1="1.44676e-06" y1="64" x2="76.7401" y2="25.1941" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#801AB3" />
                    <stop offset="1" stopColor="#4C4CFF" />
                  </linearGradient>
                  <clipPath id="clip0_16791_2983">
                    <rect width="64" height="64" rx="32" fill="white" />
                  </clipPath>
                </defs>

                <image xlinkHref={ingredient?.image} width="112" height="56" x="0" y="0" />
              </svg>
              <p className={`text text_type_main-default ${styles.name}`}>
                {ingredient?.name}
              </p>
              <div className={styles.price}>
                <p className="text text_type_digits-default ">
                  {`${ingredient?.type === 'bun' ? 2 : 1} x ${ingredient?.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>

            )
          })}
        </div>
        <div className={styles.bottomData}>
          <FormattedDate
            date={
              new Date(targetOrder?.createdAt!)
            } />
          <div className={styles.price}>
            <p className="text text_type_digits-default ">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>

    </>
  )
}