import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { ingredients } from '../../utils/data.js';
import appStyles from './app.module.css';


function App() {

    return (

        <div className={appStyles.container}>

            <AppHeader />
            <main >
                <div className={appStyles.sections}>
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructor ingredients={ingredients} />
                </div>
            </main>
        </div>

    );
}

export default App