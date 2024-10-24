import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const getRandomRecipe = async (req: Request, res: Response) => {
    
  let url= `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&include-tags=dinner`;

  try {
    const response = await axios.get(url);
    res.json({
      message: 'Random recipes fetched successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    res.status(500).json({ message: 'Failed to fetch random recipes' });
  }
};
