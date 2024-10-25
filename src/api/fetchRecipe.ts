import axios from 'axios';
import { queryStringToObject } from '../hooks/useRandomButtonPrompts';

interface RecipeQueryParams {

}

export const fetchRecipe = async (params?: RecipeQueryParams) => {
  // console.log('params:', params);
  // let updateParams = params; 
  // if(typeof params === 'string') {
  //   updateParams = queryStringToObject(params);
  // }

  const url = `http://localhost:3003/api/get-recipe`;

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
