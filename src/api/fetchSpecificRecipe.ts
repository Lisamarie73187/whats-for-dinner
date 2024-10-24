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

export const fetchSpecificRandomRecipe = async (params?: RecipeQueryParams) => {
  const url = `http://localhost:3003/api/get-recipe`;

  try {
    const response = await axios.get(url, {
        params,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};
