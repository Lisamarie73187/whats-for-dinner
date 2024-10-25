import axios from 'axios';

interface RecipeQueryParams {
  cuisine?: string;
  diet?: string;
  excludeIngredients?: string;
  intolerances?: string;
  includeIngredients?: string;
  maxReadyTime?: number;
  maxCarbs?: number;
  minProtein?: number;
  maxCalories?: number;
  maxFat?: number;
}

export const fetchRecipe = async (params?: RecipeQueryParams) => {
  const url = `http://localhost:3003/api/get-recipe`;

  try {
    const response = await axios.get(url, {
        params,
    });
    console.log('response', response);
    return response.data.recipe;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};
