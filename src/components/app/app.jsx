import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import './app-module.css';


function App() {
    return (

        <div className='app-container' >

            <AppHeader />
            <main>
                <div className='sections-wrapper'>

                    <BurgerIngredients />
                    <BurgerConstructor />

                </div>
            </main>
        </div>
    );
}

export default App