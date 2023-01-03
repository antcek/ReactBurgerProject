import styles from './order-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {


    return (
        <div className={styles.order} >
            <div className={styles.close}>
                <CloseIcon type="primary" />
            </div>
            <p className="text text_type_digits-large pt-30">034536</p>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            <div className={styles.gif}>

            </div>
            <p className="text text_type_main-small pb-2">Ваш заказ начали готовить </p>
            <p className="text text_type_main-default text_color_inactive pb-30">
                Дождитесь готовности на орбитальной станции
            </p>

        </div>
    )
}

export default OrderDetails