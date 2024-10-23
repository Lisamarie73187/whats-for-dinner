// /routes/recipeRoutes.ts

import express from 'express';
import { getRecipesByIngredients } from '../server/controllers/RecipesByIngredients';
import { getRandomRecipe } from './controllers/GetRandomRecipe';

const router = express.Router();

router.post('/get-recipes-by-ingredients', getRecipesByIngredients);
router.get('/get-random-recipe', getRandomRecipe);

export default router;
