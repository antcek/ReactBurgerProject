import AppHeader from "../../components/app-header/app-header";
import { LeftSideMenu } from "../../components/left-side-menu/left-side-menu";
import styles from './orders.module.css';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FEED_MODAl_DETAILS } from "../../services/actions/ingredient-details";
import { IUseLocation } from "../../services/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../components/modal/modal";
import { CreatedOrderDetails } from "../../components/created-order-details/created-order-details";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_START } from "../../services/actions/web-socket";


export const OrderPage: FC = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location: IUseLocation = useLocation();
  const createdOrderVisible = useSelector((store) => store.ingredientDetails.visible);

  const wsData = useSelector(store => store.wsReducer);
  const ingredients = useSelector(store => store.getProducts.products);
  // бэк возвращает не 50, а 340+ заказов, поэтому обрезаю до последних 50 
  const userOrders = wsData.userOrders[0]?.orders?.slice(wsData.userOrders[0].orders.length - 50);

  useEffect(() => {
    dispatch({ type: WS_USER_CONNECTION_START })

    return () => {
      dispatch({ type: WS_USER_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  function onCloseModal(): void {

    dispatch({
      type: FEED_MODAl_DETAILS,
      product: null,
      visible: false
    });

    if (location.pathname.startsWith('/profile/orders')) {
      navigate('/profile/orders', { replace: true })
    }

  };

  const openModal = (event: React.MouseEvent<HTMLDivElement>) => {

    const currentTargetNumber = Number(event.currentTarget.textContent?.slice(1, 6));
    const targetOrder = userOrders.find(order => order.number === currentTargetNumber);

    dispatch({
      type: FEED_MODAl_DETAILS,
      visible: true,
      targetOrder: targetOrder
    });

    navigate(`/profile/orders/${targetOrder?._id}`);
  }


  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <LeftSideMenu />
        <div className={styles.cardWrapper}>

          {userOrders?.reverse().map((order, createdOrderIndex) => {

            return (
              <div key={createdOrderIndex} onClick={openModal} className={styles.order}>
                <div className={styles.cardTop}>
                  <p className="text text_type_digits-default">{`#${order.number}`}</p>
                  <FormattedDate
                    date={
                      new Date(order.createdAt)
                    }
                    className={styles.date}
                  />
                </div>
                <h1 className="text text_type_main-medium pb-2 ">
                  {order.name}
                </h1 >
                <p className="text text_type_main-default pb-6">
                  {order.status === 'done' ? 'Выполнен' : 'Готовится'}
                </p>
                <div className={styles.cardBottom}>
                  <div className={styles.burger}>
                    <p className={`text text_type_digits-default ${styles.additionalQuantity}`}>
                      {order.ingredients.length > 5 ? `+${order.ingredients.length - 5}` : null}
                    </p>
                    {order.ingredients.map((ingredientCreated, ingredientIndex, arrOrder) => {

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

                    <p className="text text_type_digits-default">
                      {order.ingredients.map(item => {

                        return ingredients?.find(ingredient => (ingredient._id === item))

                      }).reduce((accumulator, item) => {

                        return accumulator + (item?.type === 'bun' ?
                          item!.price * 2 : item!.price)
                      }, 0)}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
            )
          })
          }

        </div>
      </div>
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