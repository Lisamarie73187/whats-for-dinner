import axios from 'axios';

export const fetchRandomRecipe = async () => {
  const url = `http://localhost:3003/api/get-random-recipe`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error;
  }
};
