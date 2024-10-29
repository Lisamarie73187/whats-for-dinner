import axios from 'axios';

export const fetchAIRecipe = async (
  {
    cuisine, 
    mainIngredient,
    reset
  }) => {
    const url = `http://localhost:3003/api/get-AI-recipe`;

    const dietaryRestrictions = getDietaryRestrictions();
    const ingredients = getIngredients();
    try {

   const params = new URLSearchParams();
    if (cuisine) params.append('cuisineType', cuisine);
    if (mainIngredient) params.append('mainIngredient', mainIngredient);
    if (dietaryRestrictions) params.append('dietaryRestrictions', dietaryRestrictions);
    if (ingredients) params.append('ingredients', ingredients);
    if (reset) params.append('reset', reset);

    const response = await axios.get(url, { params });

    if (response.status === 200) {
      console.log('Recipe fetched successfully:', response.data.recipe);
      return response.data.recipe;
    } else {
      console.error('Error fetching recipe:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};

const getDietaryRestrictions = (): string => {
  const dietaryRestrictions: string[] = [];

  if (localStorage.getItem('isVegetarian') === 'true') {
    dietaryRestrictions.push('vegetarian');
  }
  if (localStorage.getItem('isGlutenFree') === 'true') {
    dietaryRestrictions.push('gluten-free');
  }
  if (localStorage.getItem('isDairyFree') === 'true') {
    dietaryRestrictions.push('dairy-free');
  }

  return dietaryRestrictions.join(', ');
};

const getIngredients = (): string => {
  const ingredients = localStorage.getItem('selectedIngredients');
  return ingredients ? getActiveIngredientsString(JSON.parse(ingredients)) : '';
}

const getActiveIngredientsString = (ingredientState: { [key: string]: boolean }): string => {
  return Object.entries(ingredientState)
    .filter(([_, isActive]) => isActive)
    .map(([ingredient]) => ingredient)
    .join(', ');
};



