async function getIngredients() {

    const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';

    try {
        const response = await fetch(apiIngredients);

        if (response.status === 200) {
            const ingredients = await response.json();

            return ingredients.data

        }

    } catch (err) {

        return false

    }
};

export default getIngredients;