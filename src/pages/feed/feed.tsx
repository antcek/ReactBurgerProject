import React, { FC, useEffect } from 'react';
import AppHeader from '../../components/app-header/app-header';
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { FEED_MODAl_DETAILS } from '../../services/actions/ingredient-details';
import { AnimatePresence, motion } from 'framer-motion';
import { CreatedOrderDetails } from '../../components/created-order-details/created-order-details';
import Modal from '../../components/modal/modal';
import { IUseLocation } from '../../services/types/types';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_GET_MESSAGE } from '../../services/actions/web-socket';
import { ALL_CREATED_ORDERS_URL } from '../../utils/api';



export const FeedPage: FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createdOrderVisible = useSelector((store) => store.ingredientDetails.visible);
  const location: IUseLocation = useLocation();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  let wsData = useSelector(store => store.wsReducer);
  const ingredients = useSelector(store => store.getProducts.products);

  // сравнить ingredients с wsData и записать резалт в новую переменную, от

  function onCloseModal(): void {

    dispatch({
      type: FEED_MODAl_DETAILS,
      product: null,
      visible: false
    });

    if (location.pathname.startsWith('/feed')) {
      navigate('/feed/', { replace: true })
    }

  };

  const handleClick = () => {

    dispatch({
      type: FEED_MODAl_DETAILS,
      visible: true
    });

    navigate(`/feed/${123}`) // айдишник заказа

  }

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

          {wsData.messages[0]?.orders?.map((order, createdOrderIndex) => {

            return (
              <div key={createdOrderIndex} onClick={handleClick} className={styles.order}>
                <div className={styles.cardTop}>
                  <p className="text text_type_digits-default">{`#${order.number}`}</p>
                  <FormattedDate
                    date={
                      new Date(order.createdAt)
                    }
                    className={styles.date}
                  />
                </div>
                <h1 className="text text_type_main-medium ">
                  {order.name}
                </h1 >
                <div className={styles.cardBottom}>
                  <div className={styles.burger}>
                    <p className={`text text_type_digits-default ${styles.additionalQuantity}`}>
                      {order.ingredients.length > 5 ? `+${order.ingredients.length - 5}`: null}
                    </p>
                    {order?.ingredients.map((ingredientCreated, ingredientIndex, arrOrder) => {

                      if (arrOrder.length < 6) {

                        return (
                          <svg key={ingredientIndex} className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
                            {ingredients?.map((ingredientProduct, index) => {

                              if (ingredientProduct._id === ingredientCreated) {
                                return (<image key={index} xlinkHref={`${ingredientProduct.image}`}
                                  width="112" height="56" x="0" y="0" />)
                              }

                              else return null
                            })}

                          </svg>
                        )
                      }

                      else return null

                    })}
                    {order.ingredients.map((ingredientCreated, productIndex, arr) => {

                      const reversedIndex = arr.length - 1 - productIndex;

                      const classForLastIng = `${styles.lastIngredient}`

                      if (arr.length >= 6 && reversedIndex !== 5 && reversedIndex < 6) {

                        return (
                          <svg key={reversedIndex} className={styles.ingredient} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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

                            {ingredients?.map((ingredientProduct, index) => {

                              if (ingredientProduct._id === ingredientCreated) {
                                return (<image key={index} xlinkHref={`${ingredientProduct.image}`}
                                  width="112" height="56" x="0" y="0" />)
                              }

                              else return null
                            })
                            }

                          </svg>
                        )
                      }

                      if (reversedIndex === 5) {
                        return (
                          <svg key={reversedIndex} className={`${styles.ingredient} ${classForLastIng}`} width="64" height="64" viewBox="0 0 64 64" fill="#131316" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
                            {ingredients?.map((ingredientProduct, index) => {

                              if (ingredientProduct._id === ingredientCreated) {
                                return (
                                  <image key={index} xlinkHref={`${ingredientProduct.image}`}
                                    width="112" height="56" x="0" y="0" />
                                )
                              }

                              else return null;
                            })
                            }

                          </svg>
                        )
                      }

                      else return null

                    })}

                  </div>
                  <div className={styles.price}>
                    <p className="text text_type_digits-default">480</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
            )
          })
          }

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
          <p className={`text text_type_digits-large pb-15 ${styles.numbers}`}>{wsData?.messages[0]?.total}</p>
          <h2 className="text text_type_main-medium">
            Выполнено за сегодня:
          </h2 >
          <p className={`text text_type_digits-large ${styles.numbers}`}>
            {wsData?.messages[0]?.totalToday}</p>
        </div>
      </div>
      <AnimatePresence>
        {createdOrderVisible &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Modal onCloseModal={onCloseModal}>
              {<CreatedOrderDetails />}
            </Modal>
          </motion.div>}
      </AnimatePresence>
    </>
  )
}
