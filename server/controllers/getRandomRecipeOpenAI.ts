import { Request, Response } from 'express';
import { fetchRecipeFromOpenAI, RecipeParams } from '../services/recipeService';

export const getRandomRecipeOpenAI = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { ingredients, dietaryRestrictions } = req.query as RecipeParams;

		const recipeResponse = await fetchRecipeFromOpenAI({
			ingredients,
			dietaryRestrictions,
		});

		if (!recipeResponse.recipe) {
			res.status(404).json({ message: 'No recipe generated' });
			return;
		}

		const isRandomRecipe = !ingredients && !dietaryRestrictions;

		res.json({
			recipe: recipeResponse,
			query: isRandomRecipe
				? 'Randomly generated recipe'
				: { ingredients, dietaryRestrictions },
		});
	} catch (error) {
		console.error('Error generating recipe:', error);
		res
			.status(500)
			.json({ message: 'Server error', error: (error as Error).message });
	}
};
