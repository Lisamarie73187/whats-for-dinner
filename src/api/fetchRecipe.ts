import axios from 'axios';

interface RecipeQueryParams {
  cuisineType?: string;
  q?: string;
  vegetarian?: string | null;
}

export const fetchRecipe = async (params?: RecipeQueryParams) => {
  const url = `http://localhost:3003/api/get-recipe`;
  
  const vegetarian = localStorage.getItem('isVegetarian');
  params = {
    ...params,
    vegetarian,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching random recipe:', error.response.data.message);
      throw new Error(error.response.data.message || 'An unexpected error occurred');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
