import AppHeader from "../../components/app-header/app-header"
import { Outlet } from "react-router-dom";
import { useModalData } from '../../services/custom-hooks/custom-hooks';
import styles from './ingredients.module.css';
import {FC} from 'react';


export const IngredientsPage: FC = () => {

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