import axios from 'axios';
interface RecipeQueryParams {

}

export const fetchRecipe = async (params?: RecipeQueryParams) => {
  const url = `http://localhost:3003/api/get-recipe`;
  const vegetarian = localStorage.getItem('isVegetarian');

  params = {
    ...params,
    vegetarian,
  }

  try {
    const response = await axios.get(url, {
        params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};
