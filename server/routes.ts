import express from 'express';
import { getRandomRecipe } from './controllers/getRandomRecipe';
import { getRecipeEdamam } from './controllers/getRecipeEdamam';

const router = express.Router();

router.get('/get-random-recipe', getRandomRecipe);
router.get('/get-recipe', getRecipeEdamam);

export default router;
