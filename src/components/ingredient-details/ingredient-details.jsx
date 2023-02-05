import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';


function IngredientDetails() {
     
     const current = useSelector((store) => (store.ingredientDetails.current));
     const location = useLocation();
     const locationUrlIndex = location.pathname.indexOf('/ingredients/');
     const locationIngredientId = location.pathname.substring(locationUrlIndex + '/ingredients/'.length)
     const products = useSelector((store) => store.getProducts.products);
     const neededProduct = products?.find(item => item._id === locationIngredientId);

     

    return (
      
        current?._id ? ( <div className={styles.details} >
            <div className={styles.header} >
                <p className="text text_type_main-large">
                    Детали ингредиента
                </p>
               
            </div>
            <div>
                <div className={styles.body} key={current._id}>
                    <img src={current.image_large} alt='ингредиент' />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {current.name || neededProduct?.name }
                    </p>
                    <div className={styles.wrapperCalories}>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.calories ||  neededProduct?.calories}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.proteins || neededProduct?.proteins }
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.fat || neededProduct?.fat}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {current.carbohydrates }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>) : ( <div className={styles.details} >
            <div className={styles.header} >
                <p className="text text_type_main-large">
                    Детали ингредиента
                </p>
               
            </div>
            <div>
                <div className={styles.body} key={neededProduct?._id}>
                    <img src={neededProduct?.image_large} alt='ингредиент' />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {neededProduct?.name}
                    </p>
                    <div className={styles.wrapperCalories}>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {neededProduct?.calories}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {neededProduct?.proteins}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {neededProduct?.fat}
                            </p>
                        </div>
                        <div className={styles.substances}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive ">
                                {neededProduct?.carbohydrates}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>)

    )
}


export default IngredientDetails