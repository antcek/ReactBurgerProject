import React, { FC, useEffect, useState } from 'react';
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
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/web-socket';
import { WaveSpinner } from 'react-spinners-kit';


export const FeedPage: FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(store => store.loginUser.user)
  const createdOrderVisible = useSelector((store) => store.ingredientDetails.visible);
  const location: IUseLocation = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    setTimeout(() => setIsLoaded(true), 1500)

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
      setIsLoaded(false)
    }
  }, [dispatch, userData]);

  const wsData = useSelector(store => store.wsReducer);
  const ingredients = useSelector(store => store.getProducts.products);


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

  const openModal = (event: React.MouseEvent<HTMLDivElement>): void => {

    const currentTargetNumber = Number(event.currentTarget.textContent?.slice(1, 6));
    const targetOrder = wsData?.allOrders[0].orders?.find(order => order.number === currentTargetNumber);

    dispatch({
      type: FEED_MODAl_DETAILS,
      visible: true,
      targetOrder: targetOrder
    });

    navigate(`/feed/${targetOrder?._id}`);
  }



  return (
    <>
      <AppHeader />
      {wsData.wsConnected === true && isLoaded ? <> <div className={styles.heading}>
        <h1 className="text text_type_main-large mt-10">
          Лента заказов
        </h1 >
      </div>
        <div className={styles.container}>
          <div className={styles.cardWrapper}>

            {wsData.allOrders[0]?.orders?.map((order, createdOrderIndex) => {
              return (
                <div key={createdOrderIndex} onClick={openModal} className={styles.order}>
                  <div className={styles.cardTop}>
                    <p className="text text_type_digits-default">{`#${order?.number}`}</p>
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
                        {order.ingredients?.length > 5 ? `+${order.ingredients?.length - 5}` : null}
                      </p>
                      {order.ingredients.map((ingredientCreated, ingredientIndex, arrOrder) => {

                        if (arrOrder?.length < 6) {

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
                      {order.ingredients?.map((ingredientCreated, productIndex, arr) => {

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

                      <p className="text text_type_digits-default">
                        {order.ingredients.map(item => {
                          return ingredients?.find(ingredient => (ingredient._id === item))

                        }).reduce((accumulator, item, index, arrIngredients) => {

                          const duplicateBuns = arrIngredients?.filter((duplicateItem, bunIndex) => {
                            if (duplicateItem?.type === 'bun') {
                              return (arrIngredients.indexOf(((duplicateItem))) !== bunIndex)
                            }
                            else return null
                          });
                          return accumulator + (item?.type === 'bun' && duplicateBuns.length === 0 ?
                            item!?.price * 2 : item!?.price)
                        }, 0) || null}</p>
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
                  {wsData.allOrders[0].orders?.slice(0, 10).map((order, index) => {

                    return (
                      <p key={index} className="text text_type_digits-default ">
                        {order.status === 'done' ? order.number : null}
                      </p>
                    )
                  })}

                </div>
              </div>
              <div className={styles.currentTop}>
                <h2 className="text text_type_main-medium pb-6">
                  В работе:
                </h2 >
                <div className={styles.upcomingOrders}>
                  {wsData.allOrders[0].orders?.slice(0, 10).map((order, index) => {

                    return (
                      <p key={index} className="text text_type_digits-default ">
                        {order.status === 'created' ? order.number :
                          order.status === 'pending' ? order.number : null
                        }
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
            <h2 className="text text_type_main-medium">
              Выполнено за все время:
            </h2 >
            <p className={`text text_type_digits-large pb-15 ${styles.numbers}`}>
              {wsData.allOrders[0].total}</p>
            <h2 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h2 >
            <p className={`text text_type_digits-large ${styles.numbers}`}>
              {wsData.allOrders[0]?.totalToday}</p>
          </div>
        </div> </> :
        <div className={styles.loader}>
          <WaveSpinner size={100} />
        </div>}
      <AnimatePresence>
        {createdOrderVisible &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Modal onCloseModal={onCloseModal}>
              <CreatedOrderDetails />
            </Modal>
          </motion.div>}
      </AnimatePresence>
    </>
  )
}
