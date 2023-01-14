export async function getIngredients() {

    const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';

    try {
        const response = await fetch(apiIngredients);

        if (response.ok) {
            const ingredients = await response.json();

            return ingredients.data

        }

    } catch (err) {

        return false

    }
};


export async function sendOrder() {


    const constructorElem = document.getElementById('constructor');
    const idNodeElements = constructorElem.querySelectorAll('[id]');

    const idConstructor = { ingredients: Array.from(idNodeElements).map(ingredient => ingredient.id) };

    try {

        const response = await fetch('https://norma.nomoreparties.space/api/orders',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(idConstructor),
            })
        if (response.ok) {

            const result = await response.json();
            return result.order.number;

        };
    } catch (err) {

        return 'Ошибка'
    }

}



