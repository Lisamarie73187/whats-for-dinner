import axios, { AxiosResponse } from 'axios';
import {  Request, Response } from 'express';

interface Recipe {
  label: string;
  ingredientLines: string[];
  url: string;
  image: string;
}

interface RecipeHit {
  recipe: Recipe;
}

interface EdamamResponse {
  hits: RecipeHit[];
}

const appId: string = process.env.EDAMAM_API_ID as string;
const appKey: string = process.env.EDAMAM_API_KEY as string;

export const getRecipeEdamam = async (req: Request, res: Response): Promise<void> => {
  console.log('Fetching random recipe from Edamam API');
  try {
    const query = 'recipe';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&mealType=dinner&dishType=main course&random=true&from=0&to=100`;

    const response: AxiosResponse<EdamamResponse> = await axios.get(url);

    const recipes: RecipeHit[] = response.data.hits;
    if (recipes.length === 0) {
      res.status(404).json({ message: 'No recipes found' });
      return;
    }

    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe: Recipe = recipes[randomIndex].recipe;

    res.json({
      recipe: randomRecipe,
    });
  } catch (error) {
    // Handle errors and send a response with the error message
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
