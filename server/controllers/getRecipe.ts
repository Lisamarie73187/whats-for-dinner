import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const getRecipe = async (req: Request, res: Response) => {
    
  let baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=1&sort=random&type="main course"`;

  const queryParams = new URLSearchParams(req.query as Record<string, string>).toString();

  const url = `${baseUrl}&${queryParams}`; 

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
