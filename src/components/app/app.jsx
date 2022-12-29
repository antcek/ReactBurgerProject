import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import './app-module.css';

function App() {
    return (

        <div className='app-container' >

            <AppHeader />
            <main>
                <BurgerIngredients />
            </main>

        </div>
    );
}

export default App