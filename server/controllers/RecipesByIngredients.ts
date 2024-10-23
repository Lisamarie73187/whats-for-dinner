import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const getRecipesByIngredients = async (req: Request, res: Response) => {
  let { ingredients } = req.body;

  if (Array.isArray(ingredients)) {
    ingredients = ingredients.join(',');
  }

  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=15&apiKey=${SPOONACULAR_API_KEY}`;

    const response = await axios.get(url);

    res.json({
      message: 'Recipes fetched successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
};
