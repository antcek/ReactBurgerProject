import AppHeader from "../../components/app-header/app-header";
import { LeftSideMenu } from "../../components/left-side-menu/left-side-menu";
import styles from './orders.module.css'


export function OrderPage() {

  return (

    <> 
    <AppHeader/>
     <div className={styles.container}>
     <LeftSideMenu/>
     </div>
    </>
  )
}