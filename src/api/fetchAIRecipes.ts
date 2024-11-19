import axios from 'axios';

export const fetchAIRecipe = async () => {
    const url = `http://localhost:3003/api/get-AI-recipe`;

    const dietaryRestrictions = getDietaryRestrictions();
    const ingredients = getIngredients();
    try {

   const params = new URLSearchParams();
    if (dietaryRestrictions) params.append('dietaryRestrictions', dietaryRestrictions);
    if (ingredients) params.append('ingredients', ingredients);

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
  const dietaryRestrictions = localStorage.getItem("dietaryPreferences") 

  return dietaryRestrictions ? getActiveDietaryRestrictions(JSON.parse(dietaryRestrictions)) : '';
};

const getActiveDietaryRestrictions = (preferences: Record<string, boolean>): string => {
  return Object.entries(preferences)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => key.replace(/^is/, '').replace(/([A-Z])/g, ' $1').trim())
    .join(', ');
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



