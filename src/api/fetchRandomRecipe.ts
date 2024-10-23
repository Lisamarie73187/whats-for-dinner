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

export const fetchRandomRecipe = async (params?: RecipeQueryParams) => {
  const url = `http://localhost:3003/api/get-random-recipe`;

//   params = {
//     cuisine: 'italian',
//     diet: 'vegetarian',
//     maxReadyTime: 30,
//   }

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
