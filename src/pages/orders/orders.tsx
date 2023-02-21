import AppHeader from "../../components/app-header/app-header";
import { LeftSideMenu } from "../../components/left-side-menu/left-side-menu";
import styles from './orders.module.css';
import { FC } from 'react';


export const OrderPage: FC = () => {

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <LeftSideMenu />
      </div>
    </>
  )
}