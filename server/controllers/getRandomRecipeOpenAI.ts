import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { createRecipePrompt, randomRecipePrompt } from '../AIPrompts';

dotenv.config();

const openAIKey = process.env.OPENAI_API_KEY;

const cuisineTypeArr: string[] = [];
const mainIngredientArr: string[] = [];

export const getRandomRecipeOpenAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cuisineType, mainIngredient, ingredients, dietaryRestrictions, reset } = req.query as {
      cuisineType?: string;
      mainIngredient?: string;
      ingredients?: string;
      dietaryRestrictions?: string;
      reset?: string;
    };

    if (reset) {
      cuisineTypeArr.length = 0;
      mainIngredientArr.length = 0;
    }

    if (cuisineType) cuisineTypeArr.push(cuisineType);
    if (mainIngredient) mainIngredientArr.push(mainIngredient);

    const cuisineTypeString = cuisineTypeArr.join(', ');
    const mainIngredientString = mainIngredientArr.join(', ');
    const isRandomRecipe = !cuisineType && !ingredients && !dietaryRestrictions;
    const prompt = isRandomRecipe
      ? randomRecipePrompt
      : createRecipePrompt(ingredients, cuisineTypeString, mainIngredient, mainIngredientString);

    const response: AxiosResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a creative recipe generator.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        }
      }
    );

    if (response.status !== 200) {
      res.status(response.status).json({ message: 'Failed to generate recipe', error: response.statusText });
      return;
    }

    const recipeResponse = {
      recipe: JSON.parse(response.data.choices[0]?.message?.content),
      params: { cuisineTypeString, mainIngredientString, ingredients, dietaryRestrictions }
    };

    if (!recipeResponse.recipe) {
      res.status(404).json({ message: 'No recipe generated' });
      return;
    }

    res.json({
      recipe: recipeResponse,
      query: isRandomRecipe ? 'Randomly generated recipe' : { cuisineType, ingredients, dietaryRestrictions }
    });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
