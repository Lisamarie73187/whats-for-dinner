import express from 'express';
import { getRecipeEdamam } from './controllers/getRecipeEdamam';
import { getRandomRecipeOpenAI } from './controllers/getRandomRecipeOpenAI';

const router = express.Router();

router.get('/get-recipe', getRecipeEdamam);
router.get('/get-AI-recipe', getRandomRecipeOpenAI);

export default router;
