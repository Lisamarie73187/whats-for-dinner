import express from 'express';
import { getRecipeEdamam } from './controllers/getRecipeEdamam';

const router = express.Router();

router.get('/get-recipe', getRecipeEdamam);

export default router;
