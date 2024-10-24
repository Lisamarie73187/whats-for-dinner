// /routes/recipeRoutes.ts

import express from 'express';
import { getRecipesByIngredients } from './controllers/recipesByIngredients';
import { getRandomRecipe } from './controllers/getRandomRecipe';
import { getRecipe } from './controllers/getRecipe';

const router = express.Router();

router.post('/get-recipes-by-ingredients', getRecipesByIngredients);
router.get('/get-random-recipe', getRandomRecipe);
router.get('/get-recipe', getRecipe);

export default router;
