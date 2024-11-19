import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { createRecipePrompt, randomRecipePrompt } from '../AIPrompts';

dotenv.config();

const openAIKey = process.env.OPENAI_API_KEY;

export interface RecipeParams {
	ingredients?: string;
	dietaryRestrictions?: string;
}

export const fetchRecipeFromOpenAI = async (
	params: RecipeParams
): Promise<any> => {
	const { ingredients, dietaryRestrictions } = params;

	const isRandomRecipe = !ingredients && !dietaryRestrictions;
	const prompt = isRandomRecipe
		? randomRecipePrompt
		: createRecipePrompt(ingredients, dietaryRestrictions);

	const response: AxiosResponse = await axios.post(
		'https://api.openai.com/v1/chat/completions',
		{
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a creative recipe generator.' },
				{ role: 'user', content: prompt },
			],
			max_tokens: 500,
			temperature: 0.8,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${openAIKey}`,
			},
		}
	);

	if (response.status !== 200) {
		throw new Error(`Failed to generate recipe: ${response.statusText}`);
	}

	const recipeContent = response.data.choices[0]?.message?.content;

	return {
		recipe: recipeContent ? JSON.parse(recipeContent) : null,
		params: { ingredients, dietaryRestrictions },
	};
};
