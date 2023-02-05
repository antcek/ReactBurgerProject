import AppHeader from "../../components/app-header/app-header"
import { Outlet } from "react-router-dom";
import { useModalData } from '../../services/custom-hooks/custom-hooks';
import styles from './ingredients.module.css'


export function IngredientsPage() {

  useModalData();

  return (
  <>
    <AppHeader />
    <div className={styles.container}>
      <Outlet />
    </div>
  </>
  )
}